import React, { useState, useEffect } from "react";
import EmojiTable from "../EmojiTable";

export default function MessageInput() {
  const [currentMsg, setCurrentMsg] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

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
    return () => {};
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
        <button className="h-10 w-10 mx-auto block text-blue-700 rounded-3xl transition-all hover:bg-gray-100">
          <i className="bx bxs-send" />
        </button>
      </div>
    </div>
  );
}