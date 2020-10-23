import styles from '../../styles/Home.module.css'
import { useState } from 'react';
import fire from '../../components/firebase';
import { useRouter } from 'next/router';

const CreatePost = () => {
    const [room_name, setRoom_name] = useState('');
    const [chip_name, setChip_name] = useState('');
    const [notification, setNotification] = useState('');
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();

        fire.firestore()
            .collection("Microbit")
            .doc("Room_Info")
            .set({
                room_name: room_name,
                chip_name: chip_name,
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
                    <form onSubmit={handleSubmit}>
                        Room name<input className={styles.input} type="text" value={room_name}
                            onChange={({ target }) => setRoom_name(target.value)} />
                        <br />
                        Chip name<input className={styles.input} type="text" value={chip_name}
                            onChange={({ target }) => setChip_name(target.value)} />
                        <br />
                        <button className={styles.button} type="submit">Save</button>
                    </form>
                </div>
            </main>
        </div>
    )
}
export default CreatePost