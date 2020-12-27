import React, { useEffect, useRef } from "react";
import { Message, MyMessage } from "./Message";

export const ListMessage = ({ data, ref }) => {
  const bottomRef = useRef();

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);
  var sortData = data.sort((a, b) => (a.send_time > b.send_time ? 1 : -1));

  return (
    <div className="chat-container__message" ref={bottomRef}>
      {sortData.map((item, key) => {
        if (item.type === "owner_message")
          return (
            <Message content={item.message} time={item.send_time} key={key} />
          );
        if (item.type === "admin_message")
          return (
            <MyMessage content={item.message} time={item.send_time} key={key} />
          );
      })}
    </div>
  );
};
