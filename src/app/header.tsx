'use client'

import { ChangeEvent, useState } from 'react';
import { Button } from "@mui/material";
import styles from "./header.module.sass";


interface SearchInputProps {
    onSearch: (query: string) => void;
    loading: boolean;
}

export default function Header({ onSearch, loading }: SearchInputProps) {
    const [query, setQuery] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
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
