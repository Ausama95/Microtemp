import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react";
import Error from "next/error"
import fire from '../components/firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { firestore } from "../components/firebase";

export default function Home({ microNumber }) {
  const [data, setdata] = useState(null);
  const [data2, setdata2] = useState(null);
  const [error, setError] = useState(null);
  const user = fire.auth().currentUser;
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const time = Math.round(new Date().getTime()/ 1000)

  fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })

  useEffect(() => {
    return firestore
      .collection("Microbit")
      .doc("Room_Info")
      .onSnapshot(
        (snapshot) => {
          setdata2(snapshot.data());
        }
      );
  }, [microNumber]);

  useEffect(() => {
    return firestore
      .collection("Microbit")
      .doc("Doc")
      .onSnapshot(
        (snapshot) => {
          setdata(snapshot.data());
        },
        (error) => {
          setdata(null);
          setError(error);
        }
      );
  }, [microNumber]);

  if (error) {
    return <Error title={error.message} />;
  }

  if (!data) {
    return <Error title="Please wait.." />;
  }

  // ------------------------------------------------------If Chep is online--------------
  if (data.Timestamp > time - 10) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Microtemp</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="#">Microtemp</a>
          </h1>

          <p className={styles.description}>
            Room name: {' '}
            <code className={styles.code}>-</code>
          </p>

          <p className={styles.description}>
            Chip name: {' '}
            <code className={styles.code}>-</code>
          </p>

          <p className={styles.description2}>
            The Microbit is offline!
          </p>

          {loggedIn && <Link href="/users/edit_info">
            <a className={styles.btn}> Edit</a>
          </Link>}

          <div className={styles.grid_left}>
            <a href="#" className={styles.card}>
              <h3>Max temperature</h3>
              <p>0 C</p>
            </a>

            <a href="#" className={styles.card2}>
              <h3>Current temperature</h3>
              <p>0 C</p>
            </a>

            <a href="#" className={styles.card}>
              <h3>Lowest temperature</h3>
              <p>0 C</p>
            </a>
          </div>

          <div className={styles.grid_left}>
            <a href="#" className={styles.card}>
              <h3>Max light level</h3>
              <p>0</p>
            </a>

            <a href="#" className={styles.card2}>
              <h3>Current light level</h3>
              <p>0</p>
            </a>

            <a href="#" className={styles.card}>
              <h3>Lowest light level</h3>
              <p>0</p>
            </a>
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

  // ------------------------------------------------------If live--------------
  return (
    <div className={styles.container}>
      <Head>
        <title>Microtemp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        {!loggedIn
          ?
          <div>
            <Link href="/users/register">
              <a>Register</a>
            </Link> |
          <Link href="/users/login">
              <a> Login</a>
            </Link>
          </div>
          :
          <button className={styles.button} onClick={handleLogout}>Logout</button>
        } */}

        <h1 className={styles.title}>
          Welcome to <a href="#">Microtemp</a>
        </h1>

        <p className={styles.description}>
          Room name: {' '}
          <code className={styles.code}>{data2.room_name}</code>
        </p>

        <p className={styles.description}>
          Chip name: {' '}
          <code className={styles.code}>{data2.chip_name}</code>
        </p>

        {loggedIn && <Link href="/users/edit_info">
          <a className={styles.btn}> Edit</a>
        </Link>}

        <div className={styles.grid_left}>
          <a href="#" className={styles.card}>
            <h3>Max temperature</h3>
            <p>{data.Temperature_Max} C</p>
          </a>

          <a href="#" className={styles.card2}>
            <h3>Current temperature</h3>
            <p>{data.Temperature} C</p>
          </a>

          <a href="#" className={styles.card}>
            <h3>Lowest temperature</h3>
            <p>{data.Temperature_Low} C</p>
          </a>
        </div>

        <div className={styles.grid_left}>
          <a href="#" className={styles.card}>
            <h3>Max light level</h3>
            <p>{data.Light_Max}</p>
          </a>

          <a href="#" className={styles.card2}>
            <h3>Current light level</h3>
            <p>{data.Light_Level}</p>
          </a>

          <a href="#" className={styles.card}>
            <h3>Lowest light level</h3>
            <p>{data.Light_Low}</p>
          </a>
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
