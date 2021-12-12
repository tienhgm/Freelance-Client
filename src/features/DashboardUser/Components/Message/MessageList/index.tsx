import { useAppSelector } from "app/hooks";
import dayjs from "dayjs";
import { checkRoomExist } from "firebaseServices/firestore";
import { useMessageList } from "firebaseServices/hooks";
import React from "react";
import { MsgType } from "types/msgType";
import EmojiTable from "../EmojiTable";
import MessageInput from "../MessageInput";
import MessageItem from "../MessageItem";

const messages = [{ uid: 1, msg: "ska", msgTime: "" }];

export default function MessageList() {
  const sender = useAppSelector(state => state.user.curUser)
  const receiver = useAppSelector(state => state.app.partner)
  const messages: MsgType[] = useMessageList();
  return (
    <div className="message-list-wrap w-3/4 h-full">
      <div className="contact-name border-2 w-full h-20" />
      <div className="message-list border-2 border-b-0 border-t-0 w-full p-6 overflow-y-auto">

        {(messages).map((message, index) =>
          <MessageItem
            key={index}
            avatarSrc={`http://${message?.senderId === sender.id ? sender.avatar : receiver?.avatar}`}
            name={message?.senderId}
            msgText={message?.msg}
            msgTime={`${dayjs(message?.time).fromNow(true)} ago`}
            type={message?.senderId === sender.id ? "send" : "receive"}
          />
        )}
      </div>
      <MessageInput />
    </div>
  );
}
