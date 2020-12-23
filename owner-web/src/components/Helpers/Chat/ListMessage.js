import React from "react";
import { Message, MyMessage } from "./Message";

export const ListMessage = ({ data }) => {
  var sortData = data.sort((a, b) => (a.SendTime > b.SendTime ? 1 : -1));
  return (
    <div className="chat-container__message">
      {sortData.map((item, key) => {
        if (item.Type === "admin_message")
          return (
            <Message content={item.Message} time={item.SendTime} key={key} />
          );
        if (item.Type === "owner_message")
          return (
            <MyMessage content={item.Message} time={item.SendTime} key={key} />
          );
      })}
    </div>
  );
};
