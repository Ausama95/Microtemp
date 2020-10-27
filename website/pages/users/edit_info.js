import styles from '../../styles/Home.module.css'
import { useState } from 'react';
import fire from '../../components/firebase';
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { firestore } from "../../components/firebase";

const CreatePost = () => {
    const [room_name2, setRoom_name] = useState('');
    const [chip_name2, setChip_name] = useState('');
    const [notification, setNotification] = useState('');
    const router = useRouter();
    const [data2, setdata2] = useState('');

    useEffect(() => {
        return firestore
            .collection("Microbit")
            .doc("Room_Info")
            .onSnapshot(
                (snapshot) => {
                    setdata2(snapshot.data());
                }
            );
    }, []);

    function required() {
        var empt = document.forms["form1"]["text1"].value;
        if (empt == "") {
            alert("Please input a Value");
            return false;
        }
        else {
            alert('Code has accepted : you can try another');
            return true;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        fire.firestore()
            .collection("Microbit")
            .doc("Room_Info")
            .set({
                room_name: room_name2,
                chip_name: chip_name2,
            });

        setRoom_name('');
        setChip_name('');

        setNotification('All changes have been saved');
        setTimeout(() => {
            setNotification('')
            router.push("/")
        }, 2000)

    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div>
                    <h1>Edit info</h1>
                    {notification}
                    <form name="form1"  onSubmit={handleSubmit}>
                        Room name<input className={styles.input} type="text" name="fname" value={room_name2} placeholder={data2.room_name} onsubmit="required()"
                            onChange={({ target }) => setRoom_name(target.value)} />
                        <br />
                        Chip name<input className={styles.input} type="text" name="fname" value={chip_name2} placeholder={data2.chip_name} onsubmit="required()"
                            onChange={({ target }) => setChip_name(target.value)} />
                        <br />
                        <button className={styles.button} type="submit" value="Submit">Save</button>
                    </form>
                </div>
            </main>
        </div>
    )
}
export default CreatePost