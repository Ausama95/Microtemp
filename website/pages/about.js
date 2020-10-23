import styles from '../styles/Home.module.css'

function About() {
    return(
        <div className={styles.container}>

            <main className={styles.main}>
                <h1 className={styles.title}>About page</h1>
            </main>
            
            <footer className={styles.footer}>
                <a
                /* href="#" */
                target="_blank"
                rel="noopener noreferrer"
                >
                Made by: {' '}
                <img src="/Ausama95.png" alt="Ausama95 Logo" className={styles.logo} />
                </a>
            </footer>
        </div>
      
    )
}

export default About