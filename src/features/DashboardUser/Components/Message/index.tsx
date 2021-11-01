import "./index.scss";
import React from "react";
import ContactList from "./ContactList";
import MessageList from "./MessageList";
export default function Message() {
  return (
    <div className="message_page flex w-full h-full bg-white">
      <ContactList />
      <MessageList />
    </div>
  );
}
