export const SEARCH_REPOSITORIES = `
    query SearchRepositories($query: String!, $first: Int!) {
        search(query: $query, type: REPOSITORY, first: $first) {
            edges {
                node {
                    ... on Repository {
                        id
                        name
                        description
                        stargazerCount
                        forkCount
                        updatedAt
                        url
                        languages(first: 5) {
                            edges {
                                node {
                                    name
                                    color
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;