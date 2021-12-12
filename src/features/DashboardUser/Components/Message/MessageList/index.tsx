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
  // checkRoomExist
  // const roomId = useAppSelector(state => state.app.roomId)
  // const receiverId = useAppSelector(state => state.app.partner?.id)
  // const roomId = checkRoomExist(senderId, receiverId as string);
    const sender = useAppSelector(state => state.user.curUser)
    const receiver = useAppSelector(state => state.app.partner)
  const messages:MsgType[] = useMessageList();
  return (
    <div className="message-list-wrap w-3/4 h-full">
      <div className="contact-name border-2 w-full h-20" />
      <div className="message-list border-2 border-b-0 border-t-0 w-full p-6 overflow-y-auto">
        
        {/* {(messages as MsgType[]).map((message, index) => <div key={index}>{JSON.stringify(message?.msg)}{JSON.stringify(message)}</div>)} */}
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
        {/*
        <MessageItem
          avatarSrc={
            "https://www.vasterad.com/themes/hireo/images/user-avatar-small-03.jpg"
          }
          name={"David Peterson"}
          msgText={
            "Great. If you need any further clarification let me know. 👍"
          }
          msgTime={"4 hours ago"}
          type={"receive"}
        />
        <MessageItem
          avatarSrc={
            "https://www.vasterad.com/themes/hireo/images/user-avatar-small-03.jpg"
          }
          name={"David Peterson"}
          msgText={"Ok, I will. 😉"}
          msgTime={"4 hours ago"}
          type={"send"}
        />
        <MessageItem
          avatarSrc={
            "https://www.vasterad.com/themes/hireo/images/user-avatar-small-03.jpg"
          }
          name={"David Peterson"}
          msgText={
            "Hi Sindy, I just wanted to let you know that project is finished and I'm waiting for your approval."
          }
          msgTime={"4 hours ago"}
          type={"send"}
        />
        <MessageItem
          avatarSrc={
            "https://www.vasterad.com/themes/hireo/images/user-avatar-small-03.jpg"
          }
          name={"David Peterson"}
          msgText={
            "Hi Tom! Hate to break it to you, but I'm actually on vacation 🌴 until Sunday so I can't check it now. 😎"
          }
          msgTime={"4 hours ago"}
          type={"receive"}
        />
        <MessageItem
          avatarSrc={
            "https://www.vasterad.com/themes/hireo/images/user-avatar-small-03.jpg"
          }
          name={"David Peterson"}
          msgText={
            "Thanks for choosing my offer. I will start working on your project tomorrow."
          }
          msgTime={"4 hours ago"}
          type={"receive"}
        />
        <MessageItem
          avatarSrc={
            "https://www.vasterad.com/themes/hireo/images/user-avatar-small-03.jpg"
          }
          name={"David Peterson"}
          msgText={"Ok, no problem. But don't forget about last payment. 🙂"}
          msgTime={"4 hours ago"}
          type={"send"}
        />
        <MessageItem
          avatarSrc={
            "https://www.vasterad.com/themes/hireo/images/user-avatar-small-03.jpg"
          }
          name={"David Peterson"}
          msgText={
            "Thanks for choosing my offer. I will start working on your project tomorrow."
          }
          msgTime={"4 hours ago"}
          type={"receive"}
        /> */}
      </div>
      <MessageInput />
    </div>
  );
}
