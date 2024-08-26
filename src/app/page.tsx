'use client'

import { useState } from 'react';
import { DataGrid, GridColDef, gridClasses } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

import { Repository } from '@/types/github';

import styles from "./page.module.sass";
import Header from "./header";
import Footer from "./footer";
import StarIcon from '@/public/star';

const columns: GridColDef[] = [
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
    const repositories = useSelector((state: RootState) => state.search.repositories);
    const loading = useSelector((state: RootState) => state.search.loading);
    const [repository, setRepository] = useState<Repository>();
    const [searched, setSearched] = useState<boolean>(false);

    return (
        <>
            <Header searched={() => setSearched(true)} />

            <main className={styles.main}>
                {!searched ? <h2 className={[styles.absoluteCenter, styles.mainIntroText].join(' ')}>Добро пожаловать!</h2> :
                    <div className={styles.mainInner}>
                        <div className={styles.reposContainer}>
                            <h2>Результаты поиска</h2>
                            <div className={styles.repos}>
                                <DataGrid
                                    className={styles.dataGrid}
                                    loading={loading}
                                    rows={repositories}
                                    columns={columns}
                                    getRowId={row => row.id}
                                    initialState={{
                                        pagination: { paginationModel: { page: 0, pageSize: 10 } },
                                        columns: { columnVisibilityModel: { id: false } }
                                    }}
                                    pageSizeOptions={[10, 20, 50, 100]}
                                    onRowClick={(params) => setRepository(params.row)}
                                    sx={{
                                        border: 0,
                                        [`& .${gridClasses.footerContainer}`]: { border: 0 },
                                        [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: { outline: 'none' },
                                        [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: { outline: 'none' },
                                    }}
                                />
                            </div>
                        </div>

                        <aside className={styles.repoContent}>
                            {!repository ? <p className={[styles.absoluteCenter, styles.repoIntroText].join(' ')}>Выберите репозиторий</p> :
                                <>
                                    <div className={styles.repoMainInfo}>
                                        <h3 className={styles.repoIntroText}>{repository.name}</h3>
                                        <a className={styles.repoUrl} href={repository.url} target='_blank'>{repository.url}</a>
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
                                                    <Chip label={item.node.name} key={item.node.name} />
                                                )}
                                            </div>
                                        }
                                    </div>
                                    {!repository.description ? null :
                                        <p>{repository.description}</p>
                                    }
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
