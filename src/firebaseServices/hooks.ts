import { useAppSelector } from "app/hooks";
import { ref, query as realtimeQuery, limitToLast, onValue } from "firebase/database";
import { collection, doc, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MsgType } from "types/msgType";
import fireStore from "./firestore";
import { database } from "./realtimeDatabase";
let unsubscribe: () => void;

export const useMessageList = () => {
  const roomId = useAppSelector(state => state.app.roomId)
  const [messageList, setMessageList] = useState<MsgType[]>([]);
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    setMessageList([]);
    setToggle(!toggle);
  }, [roomId])

  useEffect(() => {
    const messagesRef = realtimeQuery(ref(database, `chat_rooms/${roomId}`), limitToLast(50));
    if (unsubscribe != undefined) {
      unsubscribe();
    }
    unsubscribe = onValue(messagesRef, (snapshot) => {
      let data: MsgType[] = [];
      snapshot.forEach(msg => {
        if (msg) {
          data.push(msg.val() as MsgType)
        }
      });
      if (data) {
        setMessageList([...messageList, ...data])
      }
    });
    return () => {
      unsubscribe();
    }
  }, [toggle])

  return messageList;
}

export const useContactList = (friendID: string) => {
  const [isOnline, setIsOnline] = useState(null);

  setDoc(doc(fireStore, 'messages', 'channel_name'), {
    name: 'Los Angeles',
    state: 'CA',
    country: 'USA',
  }).then((res) => {
    console.log(res);
  });
  const q = query(collection(fireStore, 'cities'), where('state', '==', 'CA'));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          console.log('New city: ', change.doc.data());
        }
        if (change.type === 'modified') {
          console.log('Modified city: ', change.doc.data());
        }
        if (change.type === 'removed') {
          console.log('Removed city: ', change.doc.data());
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    //   function handleStatusChange(status: any}) {
    //     setIsOnline(status.isOnline);
    //   }

    // ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      //   ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}