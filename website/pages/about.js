import styles from '../styles/Home.module.css'

function About() {
    return (
        <div className={styles.container}>

            <main className={styles.main}>

                {/* <h1 className={styles.title}>About</h1> */}
                
                <div className={styles.aboutsection}>
                    <h1>About The Page</h1>
                    <p>This website helps you keep track of the room's temperature & light level and gives you a live feed for every second.</p>
                    <p>With the help of a Micro:bit chip.</p>
                </div>

                <p className={styles.description}>
                    This website was developed by: {' '}
                    <code className={styles.code}>Osama Khalid Walid Ahmed</code>
                </p>
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