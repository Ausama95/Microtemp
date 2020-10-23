import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import fire from '../components/firebase';

export default function Statistics() {
    const [tables, setTables] = useState([]);
    useEffect(() => {
        fire.firestore()
            .collection("Microbit")
            .doc("Doc")
            .collection("collected_data")
            .onSnapshot(snap => {
                const tables = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTables(tables);
            });
    }, []);
    console.log(tables)

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>Statistics page</h1>

                <table className={styles.table}>
                    <tr className={styles.table_tr}>
                        <th className={styles.table_th}>Date</th>
                        <th className={styles.table_th}>Room name</th>
                        <th className={styles.table_th}>Device</th>
                        <th className={styles.table_th}>Max temperature</th>
                        <th className={styles.table_th}>Average temperature</th>
                        <th className={styles.table_th}>Lowest temperature</th>
                        <th className={styles.table_th}>Max light level</th>
                        <th className={styles.table_th}>Average light level</th>
                        <th className={styles.table_th}>lowest light level</th>
                    </tr>
                    {tables.map(table =>
                        <tr className={styles.table_tr} key={table.id}>
                                <td> {table.Date}</td>
                                <td> {table.Room_Name}</td>
                                <td> {table.Device_Name}</td>
                                <td> {table.Temperature_Max}</td>
                                <td> {table.Temperature_Average}</td>
                                <td> {table.Temperature_Low}</td>
                                <td> {table.Light_Max}</td>
                                <td> {table.Light_Level_Average}</td>
                                <td> {table.Light_Low}</td>
                        </tr>
                    )}
                </table>
            </main >

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
        </div >

    )
}
