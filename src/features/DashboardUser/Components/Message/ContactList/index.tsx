import React from "react";
import ContactItem from "../ContactItem";

const contacts = [0, 1, 2, 3];
export default function ContactList() {
  return (
    <div className="list-contact-wrap w-1/4 h-full">
      <div className="search-box border-2 border-r-0 h-20 flex">
        <div className="flex items-center justify-between px-3 m-auto bg-gray-100 w-5/6 h-10 rounded-md">
          <input
            type="text"
            placeholder="Search"
            className="h-full w-full outline-none bg-gray-100"
          />
          <i className="bx bx-search-alt-2 text-lg" />
        </div>
      </div>
      <div className="contact-list border-2 border-r-0 border-t-0 overflow-y-auto">
        <ul>
          {contacts.map((_, index) => (
            <li key={index}>
              <ContactItem
                uuid="001"
                avatarSrc={"https://www.vasterad.com/themes/hireo/images/user-avatar-small-03.jpg"}
                activity={index === 1 ? true : false}
                name={"David Peterson"}
                lastMsg={"Thanks for choosing my offer. I will start working on your project tomorrow."}
                lastMsgTime={"4 hours ago"}
              />
            </li>
          ))}
          ;
        </ul>
      </div>
    </div>
  );
}
