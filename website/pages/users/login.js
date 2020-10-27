import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react';
import fire from '../../components/firebase';
import { useRouter } from 'next/router';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notify, setNotification] = useState('');
    const router = useRouter();
    const handleLogin = (e) => {
        e.preventDefault();
        fire.auth()
            .signInWithEmailAndPassword(username, password)
            .catch((err) => {
                console.log(err.code, err.message)
                setNotification(err.message)
                setTimeout(() => {
                    setNotification('')
                }, 2000)
            })
        setUsername('')
        setPassword('')
        router.push("/")
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div>
                    <h1>Login</h1>
                    {notify}
                    <form onSubmit={handleLogin}>
                        Email<input className={styles.input} type="text" value={username}
                            onChange={({ target }) => setUsername(target.value)} />
                        <br />
        Password<input className={styles.input} type="password" value={password}
                            onChange={({ target }) => setPassword(target.value)} />
                        <br />
                        <button className={styles.button} type="submit">Login</button>
                    </form>
                </div>
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
export default Login
