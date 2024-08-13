import styles from "./page.module.sass";
import Header from "./header";
import Footer from "./footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.introContainer}>
          <p className={styles.introText}>Добро пожаловать!</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
