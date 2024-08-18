import { GraphQLClient } from 'graphql-request';

const GITHUB_ENDPOINT = 'https://api.github.com/graphql';

export const githubClient = new GraphQLClient(GITHUB_ENDPOINT, {
    headers: {
        Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
});

export const fetchGitHubData = async (query: string, variables?: Record<string, any>) => {
    if (!process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
        throw new Error("GitHub token is not defined. Please check your .env.local file.");
    }

    try {
        return await githubClient.request(query, variables);
    } catch (error) {
        console.error('Error fetching data from GitHub:', error);
    }
};
