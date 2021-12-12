import './index.scss';
import React, { useEffect } from 'react';
import ContactList from './ContactList';
import MessageList from './MessageList';
import { getDatabase, ref, push, set, query, limitToLast, onValue, get, child } from 'firebase/database';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { updateActState } from 'firebaseServices/firestore';
import { useAppSelector } from 'app/hooks';

dayjs.extend(relativeTime);

export default function Message() {
  const user = useAppSelector((state) => state.user.curUser);
  useEffect(() => {
    (async () => {
      updateActState({
        id: user.id,
        name: user.firstName + ' ' + user.lastName,
        avatar: user.avatar
      }, true)
    })()
    return () => {
      (async () => {
        updateActState({
          id: user.id,
          name: user.firstName + ' ' + user.lastName,
          avatar: user.avatar
        }, false)
      })()
    }
  }, [])
  return (
    <div className="message_page flex w-full h-full bg-white">
      <ContactList />
      <MessageList />
    </div>
  );
}
