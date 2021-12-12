import './index.scss';
import React from 'react';
import ContactList from './ContactList';
import MessageList from './MessageList';
import { getDatabase, ref, push, set, query, limitToLast, onValue, get, child } from 'firebase/database';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Message() {
    return (
    <div className="message_page flex w-full h-full bg-white">
      <ContactList />
      <MessageList />
    </div>
  );
}
