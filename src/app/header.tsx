'use client'

import { ChangeEvent } from 'react';
import { Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { searchRepositories, setQuery } from '@/lib/features/searchSlice';

import styles from "./header.module.sass";


interface SearchInputProps {
    searched: () => void;
}

export default function Header({ searched = () => {} }: SearchInputProps) {
    const dispatch = useDispatch<AppDispatch>();
    const query = useSelector((state: RootState) => state.search.query);
    const loading = useSelector((state: RootState) => state.search.loading);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setQuery(e.target.value));
    };

    const handleSearch = () => {
        searched()
        dispatch(searchRepositories(query));
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <input id="searchInput" className={styles.searchInput}
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Введите поисковый запрос"
                    autoComplete="off"
                    onKeyDown={e => { if (e.key === "Enter") handleSearch() }}
                />
                <Button className={styles.searchButton}
                    type='button'
                    disabled={loading}
                    onClick={handleSearch}
                    variant="contained"
                >
                    {loading ? 'Поиск...' : 'Искать'}
                </Button>
            </div>
        </header>
    )
}
