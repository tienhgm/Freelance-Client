import React from "react";
import "./index.scss";
type ContactItemPropsType = {
  avatarSrc: string;
  activity: boolean;
  name: string;
  seen: boolean;
  lastMsg: string;
  lastMsgTime: string;
  selected: boolean;
};
export default function ContactItem({
  avatarSrc,
  activity,
  name,
  lastMsg,
  lastMsgTime,
  selected,
  seen,
}: ContactItemPropsType) {
  return (
    <div className={`contact-item cursor-pointer flex items-center px-10 py-3 h-24 w-full relative
    ${seen ? "" : "font-bold"
      } ${selected ? "bg-gray-100 selected" : "bg-white"
      }`}>
      <div className="contact__avatar relative">
        <div className="avatar__image rounded-full overflow-hidden w-10 h-10">
          <img src={avatarSrc} alt={name} width="40" height="40" />
        </div>
        <div className="avatar__status absolute bottom-0 right-0 h-3 w-3 rounded-full bg-white flex">
          <div
            className={`${activity ? "bg-green-400" : "bg-gray-400"
              } text-sm m-auto w-2 h-2 rounded-full`}
          />
        </div>
      </div>
      <div className="contact__info flex flex-wrap justify-between items-center pl-4 w-full">
        <div className={`contact__name mb-2 text-lg ${seen ? "font-medium" : "font-bold"}`}>{name}</div>
        <div className={`contact__last-message-time text-sm ${seen ? "font-thin" : "font-thin"}`}>{lastMsgTime}</div>
        <div className="contact__last-message w-full overflow-hidden whitespace-nowrap text-base overflow-ellipsis">
          {lastMsg}
        </div>
      </div>
    </div>
  );
}
