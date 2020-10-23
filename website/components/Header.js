import Link from 'next/link';
import fire from 'firebase';
import { useEffect, useState } from "react";

function Header() {
    const user = fire.auth().currentUser;
    const [notification, setNotification] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    fire.auth()
        .onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
        })

    const handleLogout = () => {
        fire.auth()
            .signOut()
            .then(() => {
                setNotification('Logged out')
                setTimeout(() => {
                    setNotification('')
                }, 2000)
            });
    }

    if (user) {
        // Loged in
        return (
            <header>
                <div>
                    <ul>
                        <li><Link href="/"><a>Home</a></Link></li>
                        <li><Link href="/statistics"><a>Statistics</a></Link></li>
                        <li><Link href="/about"><a>About</a></Link></li>
                        <li onClick={handleLogout}><a>Logout</a></li>
                    </ul>

                    <ul>
                        <li><Link href="/"><a>Room1</a></Link></li>
                    </ul>

                    <style jsx>{`
                    
                    ul {
                        overflow: hidden;
                        background-color: #333;
                        list-style-type: none;
                        margin: 0;
                        padding: 0;
                    }
                    
                    ul a {
                        float: left;
                        color: #f2f2f2;
                        text-align: center;
                        padding: 14px 16px;
                        text-decoration: none;
                        font-size: 17px;
                    }
                    
                    ul a:hover {
                        background-color: #ddd;
                        color: black;
                        cursor: pointer;
                    }
                    
                    ul a.active {
                        background-color: #4CAF50;
                        color: white;
                    }
                    `}</style>
                </div>
            </header>
        )
    }

    // Not loged in
    else {
        return (
            <header>
                <div>
                    <ul>
                        <li><Link href="/"><a>Home</a></Link></li>
                        <li><Link href="/statistics"><a>Statistics</a></Link></li>
                        <li><Link href="/about"><a>About</a></Link></li>
                        <li><Link href="/users/login"><a>Login</a></Link></li>
                    </ul>

                    <ul>
                        <li><Link href="/"><a>Room1</a></Link></li>
                    </ul>

                    <style jsx>{`
                    
                    ul {
                        overflow: hidden;
                        background-color: #333;
                        list-style-type: none;
                        margin: 0;
                        padding: 0;
                    }
                    
                    ul a {
                        float: left;
                        color: #f2f2f2;
                        text-align: center;
                        padding: 14px 16px;
                        text-decoration: none;
                        font-size: 17px;
                    }
                    
                    ul a:hover {
                        background-color: #ddd;
                        color: black;
                    }
                    
                    ul a.active {
                        background-color: #4CAF50;
                        color: white;
                    }
                    `}</style>
                </div>
            </header>
        )
    }
}

export default Header