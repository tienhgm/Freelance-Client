import "./index.scss";
import { Tabs } from "antd";
import emojiData from "constants/emoji_data";
import React, { useEffect, useRef } from "react";
const { TabPane } = Tabs;

export default function EmojiTable({ onSelect, onClickOutSide }: { onSelect: Function, onClickOutSide: Function }) {
  const emojiTableRef = useRef(null);
  const handleSelectEmoji = (event: any) => {
    onSelect(
      event.target.querySelector("span")?.innerHTML || event.target?.innerHTML
    );
  };
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        emojiTableRef.current &&
        // @ts-ignore
        !emojiTableRef.current.contains(event.target)
      ) {
        onClickOutSide();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiTableRef]);

  return (
    <div
      ref={emojiTableRef}
      className="emoji-table absolute w-72 h-72 bg-white rounded-md shadow-lg"
    >
      <Tabs defaultActiveKey="0">
        {Object.entries(emojiData).map(([label, data]: any, index) => (
          <TabPane tab={label} key={index}>
            <ul className="flex flex-wrap overflow-y-auto h-52 p-3 pt-0">
              {data.map((emoji: string, index: number) => (
                <li
                  key={index}
                  onClick={handleSelectEmoji}
                  className="hover:bg-gray-300 rounded-md text-base p-1 cursor-pointer"
                >
                  <span>{emoji}</span>
                </li>
              ))}
            </ul>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}
