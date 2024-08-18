'use client'

import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';

import { fetchGitHubData } from '../lib/githubGraphQL';
import { SEARCH_REPOSITORIES } from '../queries/searchRepositories';
import { Repository } from '../types/github';

import styles from "./page.module.sass";
import Header from "./header";
import Footer from "./footer";
import StarIcon from '@/public/star';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', hideable: false },
    { field: 'name', headerName: 'Название', minWidth: 150, flex: 1, },
    {
        field: 'languages', headerName: 'Язык', minWidth: 150, flex: 1,
        valueGetter: (value: any) => value.edges.length != 0 ? value.edges[0].node.name : 'Н/Д'
    },
    { field: 'forkCount', headerName: 'Число форков', minWidth: 100, flex: 1, },
    { field: 'stargazerCount', headerName: 'Число звезд', minWidth: 100, flex: 1, },
    {
        field: 'updatedAt', headerName: 'Дата обновления', minWidth: 100, flex: 1, type: 'date',
        valueGetter: value => new Date(value)
    }
];


export default function Home() {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [repository, setRepository] = useState<Repository>();
    const [loading, setLoading] = useState<boolean>(false);
    const [searched, setSearched] = useState<boolean>(false);

    const handleSearch = async (query: string) => {
        setLoading(true);
        setSearched(true)
        try {
            await fetchGitHubData(SEARCH_REPOSITORIES, {
                query,
                first: 100,
            }).then(
                (data: any) => {
                    setRepositories(data.search.edges.map((item: { node: any; }) => item.node))
                }
            )
        } catch (error) {
            console.error('Error fetching repositories:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header onSearch={handleSearch} loading={loading} />
            <main className={styles.main}>
                {!searched ? <p className={[styles.absoluteCenter, styles.mainIntroText].join(' ')}>Добро пожаловать!</p> :
                    <div className={styles.mainInner}>
                        <div className={styles.reposContainer}>
                            <h2>Результаты поиска</h2>
                            <div className={styles.repos}>
                                <DataGrid
                                    className={styles.dataGrid}
                                    loading={loading}
                                    rows={repositories}
                                    columns={columns}
                                    initialState={{
                                        pagination: { paginationModel: { page: 0, pageSize: 10 } },
                                        columns: { columnVisibilityModel: { id: false } }
                                    }}
                                    pageSizeOptions={[10, 20, 50, 100]}
                                    onRowClick={(params) => setRepository(params.row)}
                                    sx={{
                                        border: 0,
                                        '& .MuiDataGrid-footerContainer': { border: 0 }
                                    }}
                                />
                            </div>
                        </div>
                        <aside className={styles.repoContent}>
                            {!repository ? <p className={[styles.absoluteCenter, styles.repoIntroText].join(' ')}>Выберите репозиторий</p> :
                                <>
                                    <div className={styles.repoMainInfo}>
                                        <h3>{repository.name}</h3>
                                        <div className={styles.repoStarsContainer}>
                                            <Chip color='primary' label={repository.languages.edges.length != 0 ? repository.languages.edges[0].node.name : 'Н/Д'} />
                                            <div className={styles.repoStars}>
                                                <StarIcon />
                                                <p>{repository.stargazerCount}</p>
                                            </div>
                                        </div>
                                        {repository.languages.edges.length == 0 ? null :
                                            <div className={styles.repoLanguages}>
                                                {repository.languages.edges.map((item: any) =>
                                                    <Chip label={item.node.name} />
                                                )}
                                            </div>
                                        }
                                    </div>
                                    <p>{repository.description}</p>
                                </>
                            }
                        </aside>
                    </div>
                }
            </main>
            <Footer />
        </>
    );
}
