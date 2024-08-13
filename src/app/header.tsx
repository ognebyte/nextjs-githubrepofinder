import { Button } from "@mui/material";
import styles from "./header.module.sass";

export default function Header() {
    return (
        <header className={styles.header}>
            <form className={styles.searchContainer}>
                <input id="searchInput" className={styles.searchInput} placeholder="Введите поисковый запрос" />
                <Button type="submit" className={styles.searchButton} variant="contained">Искать</Button>
            </form>
        </header>
    )
}
