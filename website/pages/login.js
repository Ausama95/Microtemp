import styles from '../styles/Home.module.css'

function login() {
    return(
        <div className={styles.container}>

            <main className={styles.main}>
                <h1 className={styles.title}>login page</h1>

               {/*  <form action="/action_page.php" method="post">

                <div className={logstyle.container}>
                <label for="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required></input>

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required></input>
                    
                <button type="submit">Login</button>
                </div>

                <div className={logstyle.container} style="background-color:#f1f1f1">
                <button type="button" class="cancelbtn">Cancel</button>
                <span class="psw">Forgot <a href="#">password?</a></span>
                </div>
                </form> */}
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

export default login