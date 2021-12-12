import React, { SetStateAction, useEffect, useState } from 'react';
import ContactItem from '../ContactItem';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { UserType } from 'types/userType';
import { setContactFilter, setPartner, setRoomId } from 'app/slices/appSlice';
import { checkRoomExist, getPartners } from 'firebaseServices/firestore';
import { useContactList } from 'firebaseServices/hooks';
import dayjs from 'dayjs';

export default function ContactList() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.curUser);
  const partner = useAppSelector((state) => state.app.partner);
  // const [contacts, setContacts] = useState([]);
  const handleChangeContact = (partner: UserType) => {
    checkRoomExist(user.id, partner?.id as string).then((roomId) => {
      dispatch(setRoomId(roomId));
      dispatch(setPartner(partner));
    });
  };

  const handleChangeFilter = (event: any) => {
    dispatch(setContactFilter(event.target.value));
  }

  const contactList = useContactList(handleChangeContact);

  return (
    <div className="list-contact-wrap w-1/4 h-full">
      <div className="search-box border-2 border-r-0 h-20 flex">
        <div className="flex items-center justify-between px-3 m-auto bg-gray-100 w-5/6 h-10 rounded-md">
          <input onChange={handleChangeFilter} type="text" placeholder="Search" className="h-full w-full outline-none bg-gray-100" />
          <i className="bx bx-search-alt-2 text-lg" />
        </div>
      </div>
      <div className="contact-list border-2 border-r-0 border-t-0 overflow-y-auto">
        <ul>
          {/* {JSON.stringify(contactList)} */}
          {contactList.map((contact: any, index) => (
            <li
              key={index}
              onClick={() => {
                handleChangeContact(contact);
              }}
            >
              <ContactItem
                seen={contact.id !== contact.lastMsgBy}
                avatarSrc={'http://' + contact.avatar}
                activity={contact.isAct}
                name={contact.name}
                lastMsg={contact.lastMsg}
                lastMsgTime={contact.lastMsgTime ? `${dayjs(contact.lastMsgTime).fromNow(true)} ago` : ''}
                selected={partner ? contact.id === partner?.id : index === 0 ? true : false}
              />
            </li>
          ))}
          ;
        </ul>
      </div>
    </div>
  );
}
