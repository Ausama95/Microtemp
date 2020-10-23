import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react';
import fire from '../../components/firebase';
import { useRouter } from 'next/router';

const Register = () => {
    const router = useRouter();
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passConf, setPassConf] = useState('');
    const [notification, setNotification] = useState('');
    const handleLogin = (e) => {
        e.preventDefault();
        if (password !== passConf) {
            setNotification(
                'Password and password confirmation does not   match'
            )
            setTimeout(() => {
                setNotification('')
            }, 2000)
            setPassword('');
            setPassConf('');
            return null;
        }
        fire.auth()
            .createUserWithEmailAndPassword(userName, password)
            .catch((err) => {
                console.log(err.code, err.message)
            });
        router.push("/")
    }
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div>
                    <h1>Create new user</h1>
                    {notification}
                    <form onSubmit={handleLogin}>
                        Email: <input className={styles.input} type="text" value={userName}
                            onChange={({ target }) => setUsername(target.value)} />
                        <br />
                        Password: <input className={styles.input} type="password" value={password}
                            onChange={({ target }) => setPassword(target.value)} />
                        <br />
                        Repeat Password: <input className={styles.input} type="password" value={passConf}
                            onChange={({ target }) => setPassConf(target.value)} />
                        <br />
                        <button className={styles.button} type="submit">Sign up</button>
                    </form>
                </div>
            </main>
        </div>
    )
}
export default Register