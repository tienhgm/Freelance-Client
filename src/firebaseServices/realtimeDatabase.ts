import firebase from 'firebase/compat/app';
import { getDatabase, limitToLast, onValue, push, query, ref, set } from 'firebase/database';
import firebaseConfig from './firebaseConfig';
import { sendMsg } from './firestore';

firebase.initializeApp(firebaseConfig);

export const database = getDatabase();

export async function sendMessage(roomId: string, senderId: string, msg: string) {
    const roomRef = ref(database, `chat_rooms/${roomId}`);
    const newMsgRef = push(roomRef);
    const currentTime = new Date().getTime();
    await set(newMsgRef, {
        senderId: senderId,
        msg: msg,
        time: currentTime
    });

    await sendMsg(roomId, senderId, msg, currentTime)
}

export async function getMessage(roomId: string) {
    const messagesRef = query(ref(database, `chat_rooms/${roomId}`), limitToLast(50));
    onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        console.log('data', data);
    });
}
