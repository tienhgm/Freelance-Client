import React, { SetStateAction, useEffect, useState } from 'react';
import ContactItem from '../ContactItem';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { UserType } from 'types/userType';
import { setPartner, setRoomId } from 'app/slices/appSlice';
import { checkRoomExist, getPartners } from 'firebaseServices/firestore';

export default function ContactList() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.curUser);
  const partner = useAppSelector(state => state.app.partner);
  const [contacts, setContacts] = useState([]);
  const handleChangeContact = (partner: UserType) => {
    //   const senderId = useAppSelector(state => state.user.curUser.id)
    // const receiverId = useAppSelector(state => state.app.partner?.id)
    checkRoomExist(user.id, partner?.id as string).then(roomId => {
      dispatch(setRoomId(roomId));
      dispatch(setPartner(partner));
    });
  }
  useEffect(() => {
    (async () => {
      let partners = await getPartners({
        id: user.id,
        name: user.firstName + ' ' + user.lastName,
        avatar: user.avatar
      })
      setContacts(partners as SetStateAction<never[]>)
      if (!partner && partners.length > 0) {
        handleChangeContact(partners[0]);
      }
    })()
  }, [partner])

  return (
    <div className="list-contact-wrap w-1/4 h-full">
      <div className="search-box border-2 border-r-0 h-20 flex">
        <div className="flex items-center justify-between px-3 m-auto bg-gray-100 w-5/6 h-10 rounded-md">
          <input type="text" placeholder="Search" className="h-full w-full outline-none bg-gray-100" />
          <i className="bx bx-search-alt-2 text-lg" />
        </div>
      </div>
      <div className="contact-list border-2 border-r-0 border-t-0 overflow-y-auto">
        <ul>
          {contacts.map((contact: UserType, index) => (
            <li key={index}
              onClick={() => {
                handleChangeContact(contact)
              }}
            >
              <ContactItem
                uuid={contact.id}
                avatarSrc={'http://' + contact.avatar}
                // @ts-ignore
                activity={contact.isAct}
                name={contact.name}
                lastMsg={'Thanks for choosing my offer. I will start working on your project tomorrow.'}
                lastMsgTime={'4 hours ago'}
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
