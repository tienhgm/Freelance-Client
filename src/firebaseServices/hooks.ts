import { useAppSelector } from 'app/hooks';
import { ref, query as realtimeQuery, limitToLast, onValue } from 'firebase/database';
import { collection, doc, DocumentData, onSnapshot, orderBy, query, setDoc, Unsubscribe, where } from 'firebase/firestore';
import { SetStateAction, useEffect, useState } from 'react';
import { MsgType } from 'types/msgType';
import { UserType } from 'types/userType';
import fireStore, { getCurrentUser, getPartners } from './firestore';
import { database } from './realtimeDatabase';
import { mergeList } from './utils';
let unsubscribeMsg: Unsubscribe;
let rooms: DocumentData[] = [];
let contacts: DocumentData[] = [];

export const useMessageList = () => {
  const roomId = useAppSelector((state) => state.app.roomId);
  const [messageList, setMessageList] = useState<MsgType[]>([]);
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    setMessageList([]);
    setToggle(!toggle);
  }, [roomId]);

  useEffect(() => {
    const messagesRef = realtimeQuery(ref(database, `chat_rooms/${roomId}`), limitToLast(50));
    if (!!unsubscribeMsg) {
      unsubscribeMsg();
    }
    unsubscribeMsg = onValue(messagesRef, (snapshot) => {
      let data: MsgType[] = [];
      snapshot.forEach((msg) => {
        if (msg && msg.hasChild('msg')) {
          data.push(msg.val() as MsgType);
        }
      });
      if (data) {
        setMessageList([...messageList, ...data]);
      }
      const msgListElement = document.querySelector("div.message-list.border-2.border-b-0.border-t-0.w-full.p-6.overflow-y-auto")
      if (msgListElement) {
        msgListElement.scrollTop = msgListElement.scrollHeight;
      }
    });
    return () => {
      if (!!unsubscribeMsg) {
        unsubscribeMsg();
      }
    };
  }, [toggle]);

  return messageList;
};

export const useContactList = (handleChangeContact: (partner: any) => void) => {
  const user = useAppSelector((state) => state.user.curUser);
  const partner = useAppSelector((state) => state.app.partner);
  const [roomList, setRoomList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [partnerList, setPartnerList] = useState([]);

  useEffect(() => {
    const unsubscribeUser = onSnapshot(doc(fireStore, 'users', user.id),
      { includeMetadataChanges: true },
      (doc) => {
        const curUser = doc.data();
        if (curUser) {
          console.log(curUser)
          setRoomList(curUser.rooms)
          setPartnerList(curUser.partners)
        }
      });

    return () => {
      unsubscribeUser();
    }

  }, [])


  useEffect(() => {
    let unsubscribeRoom: Unsubscribe;
    let unsubscribePartner: Unsubscribe;
    if (roomList?.length > 0) {
      const roomsQuery = query(collection(fireStore, 'chat_rooms'), where('name', 'in', roomList));
      unsubscribeRoom = onSnapshot(roomsQuery, (snapshot) => {
        rooms = [];
        snapshot.docs.forEach(doc => {
          const room = doc.data();
          if (room) {
            rooms.push(room);
          }
        })
        setContactList(mergeList(contacts, rooms) as SetStateAction<never[]>)
      });
    }
    if (partnerList?.length > 0) {
      const partnersQuery = query(collection(fireStore, 'users'), where('id', 'in', partnerList));
      unsubscribePartner = onSnapshot(partnersQuery, (snapshot) => {
        contacts = [];
        snapshot.docs.forEach(doc => {
          const contact = doc.data();
          if (contact) {
            contacts.push(contact);
          }
        })
        setContactList(mergeList(contacts, rooms) as SetStateAction<never[]>)
      });
    }

    if (!partner && partnerList.length > 0) {
      handleChangeContact(partnerList[0]);
    }
    else {
      handleChangeContact(partner!);
    }
    return () => {
      if (!!unsubscribePartner) {
        unsubscribePartner();
      }
      if (!!unsubscribeRoom) {
        unsubscribeRoom();
      }
    };
  }, [roomList, partnerList]);

  return contactList;
};


// useEffect(() => {
  //   const q = query(collection(fireStore, 'chat_rooms'), where('name', 'in', roomList), orderBy('lastMsgTime', 'desc'));
  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     console.log(snapshot.docs);
  //     snapshot.docChanges().forEach((change) => {
  //       if (change.type === 'added') {
  //         console.log('New: ', change.doc.data());
  //       }
  //       if (change.type === 'modified') {
  //         console.log('Modified: ', change.doc.data());
  //       }
  //       if (change.type === 'removed') {
  //         console.log('Removed: ', change.doc.data());
  //       }
  //     });
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);