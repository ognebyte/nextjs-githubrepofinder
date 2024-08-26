import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGitHubData } from '@/lib/githubGraphQL';
import { SEARCH_REPOSITORIES } from '@/queries/searchRepositories';
import { Repository } from '@/types/github';

interface SearchState {
    query: string;
    repositories: Repository[];
    loading: boolean;
    error: string | null;
}

const initialState: SearchState = {
    query: '',
    repositories: [],
    loading: false,
    error: null,
};

// Асинхронный thunk для поиска репозиториев
export const searchRepositories = createAsyncThunk(
    'search/searchRepositories',
    async (query: string) => {
        const data = await fetchGitHubData(SEARCH_REPOSITORIES, {
            query,
            first: 100,
        }).then((data: any) => data.search.edges.map((item: { node: any; }) => item.node))
        return data;
    }
);

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchRepositories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchRepositories.fulfilled, (state, action) => {
                state.loading = false;
                state.repositories = action.payload;
            })
            .addCase(searchRepositories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch repositories';
            });
    },
});


export const { setQuery } = searchSlice.actions;

export default searchSlice.reducer;