import React from "react";
import "./index.scss";

const RECEIVER = "receive";
const SENDER = "send";

type MessageItemPropsType = {
  avatarSrc: string;
  name: string;
  msgText: string;
  msgTime: string;
  type: "receive" | "send";
};

export default function MessageItem({
  avatarSrc,
  name,
  msgText,
  type,
}: MessageItemPropsType) {
  return (
    <div
      className={`message-item flex items-center mb-3 ${
        type === SENDER ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="message-item__avatar">
        <div className="avatar__image rounded-full overflow-hidden w-10 h-10">
          <img src={avatarSrc} alt={name} width="40" height="40" />
        </div>
      </div>
      <div
        className={`message-item__text mx-3 p-2 rounded-md relative ${
          type === RECEIVER
            ? "bg-gray-300 message-item__text--receive"
            : "bg-blue-600 message-item__text--send"
        }`}
      >
        {msgText}
      </div>
    </div>
  );
}
