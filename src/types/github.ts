export interface Language {
    name: string;
    color: string;
}

export interface Repository {
    id: number;
    name: string;
    description: string | null;
    stargazerCount: number;
    forkCount: number;
    updatedAt: Date;
    url: string;
    languages: {
        edges: {
            node: Language;
        }[];
    }
}
