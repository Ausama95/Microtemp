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
            .orderBy("Timestamp", "desc")
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
                <div className={styles.mobilediv}>
                    <table className={styles.table}>
                        <caption className={styles.table_caption}>Statistics page</caption>
                        <thead className={styles.table_thead}>
                            <tr className={styles.table_tr}>
                                <th scope="col" className={styles.table_th}>Date</th>
                                <th scope="col" className={styles.table_th}>Room name</th>
                                <th scope="col" className={styles.table_th}>Device</th>
                                <th scope="col" className={styles.table_th}>Max temperature</th>
                                <th scope="col" className={styles.table_th}>Average temperature</th>
                                <th scope="col" className={styles.table_th}>Lowest temperature</th>
                                <th scope="col" className={styles.table_th}>Max light level</th>
                                <th scope="col" className={styles.table_th}>Average light level</th>
                                <th scope="col" className={styles.table_th}>lowest light level</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {tables.map(table =>
                                <tr className={styles.table_tr} key={table.id}>
                                    <td data-label="Date" className={styles.table_td}> {table.Date}</td>
                                    <td data-label="Room name" className={styles.table_td}> {table.Room_Name}</td>
                                    <td data-label="Device" className={styles.table_td}> {table.Device_Name}</td>
                                    <td data-label="Max temperature" className={styles.table_td}> {table.Temperature_Max}</td>
                                    <td data-label="Average temperature" className={styles.table_td}> {table.Temperature_Average}</td>
                                    <td data-label="Lowest temperature" className={styles.table_td}> {table.Temperature_Low}</td>
                                    <td data-label="Max light level" className={styles.table_td}> {table.Light_Max}</td>
                                    <td data-label="Average light level" className={styles.table_td}> {table.Light_Level_Average}</td>
                                    <td data-label="lowest light level" className={styles.table_td}> {table.Light_Low}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
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
