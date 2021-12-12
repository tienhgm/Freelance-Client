import { useAppSelector } from "app/hooks";
import { sendMessage } from "firebaseServices/realtimeDatabase";
import React, { useState, useEffect } from "react";
import EmojiTable from "../EmojiTable";

export default function MessageInput() {
  const roomId = useAppSelector(state => state.app.roomId)
  const senderId = useAppSelector(state => state.user.curUser.id)
  const [currentMsg, setCurrentMsg] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSendMessage = () => {
    setCurrentMsg("");
    sendMessage(roomId, senderId, currentMsg).then(() => {
      const msgListElement = document.querySelector("div.message-list.border-2.border-b-0.border-t-0.w-full.p-6.overflow-y-auto")
      if (msgListElement) {
        msgListElement.scrollTop = msgListElement.scrollHeight;
      }
    })
  }

  const changeMsg = (event: any) => {
    setCurrentMsg(event.target.value);
  };

  const toggleEmojiTable = (event: any) => {
    setShowEmoji(!showEmoji);
  };

  const addEmoji = (emoji: string) => {
    setCurrentMsg(currentMsg + emoji);
  };

  useEffect(() => {
    if (showEmoji) {
    }
    return () => { };
  }, [showEmoji]);
  return (
    <div className="message w-full h-24 bg0-blue-600 border-2 flex items-center">
      <div className="message__emoji w-1/12 relative">
        {showEmoji && (
          <EmojiTable onSelect={addEmoji} onClickOutSide={toggleEmojiTable} />
        )}
        <button
          onClick={toggleEmojiTable}
          className="h-10 w-10 mx-auto block text-blue-700 rounded-3xl transition-all hover:bg-gray-100"
        >
          <i className="bx bx-face" />
        </button>
      </div>
      <div className="message__input w-11/12 h-full">
        <textarea
          value={currentMsg}
          onChange={changeMsg}
          name="new-message"
          id="new-message"
          placeholder="Your message . . ."
          className="p-5 pt-8 w-full h-full outline-none resize-none text-base"
        />
      </div>
      <div className="message__submit w-1/12">
        <button onClick={handleSendMessage} className="h-10 w-10 mx-auto block text-blue-700 rounded-3xl transition-all hover:bg-gray-100">
          <i className="bx bxs-send" />
        </button>
      </div>
    </div>
  );
}
