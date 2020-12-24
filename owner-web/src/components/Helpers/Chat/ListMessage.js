import React from "react";
import { Message, MyMessage } from "./Message";

export const ListMessage = ({ data }) => {
  var sortData = data.sort((a, b) => (a.send_time > b.send_time ? 1 : -1));
  return (
    <div className="chat-container__message">
      {sortData.map((item, key) => {
        if (item.type === "admin_message")
          return (
            <Message content={item.message} time={item.send_time} key={key} />
          );
        if (item.type === "owner_message")
          return (
            <MyMessage content={item.message} time={item.send_time} key={key} />
          );
      })}
    </div>
  );
};
