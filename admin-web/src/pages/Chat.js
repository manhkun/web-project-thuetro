import React from "react";
import HeaderChat from "../components/Helpers/Chat/HeaderChat";
import { Message, MyMessage } from "../components/Helpers/Chat/Message";
import UserChat from "../components/Helpers/Chat/UserChat";
import "./Chat.css";

function Chat() {
  return (
    <div>
      <div className="chat-container">
        <div className="chat-container__user">
          <UserChat></UserChat>
          <UserChat></UserChat>
          <UserChat></UserChat>
          <UserChat></UserChat>
        </div>
        <div className="chat-container__content">
          <HeaderChat></HeaderChat>
          <div className="chat-container__message">
            <Message></Message>
            <Message></Message>
            <MyMessage></MyMessage>
            <MyMessage></MyMessage>
            <MyMessage></MyMessage>
            <MyMessage></MyMessage>
            <MyMessage></MyMessage>
            <MyMessage></MyMessage>
            <MyMessage></MyMessage>
            <MyMessage></MyMessage>
            <MyMessage></MyMessage>
            <MyMessage></MyMessage>
          </div>
          <form className="chat-container__send" action="">
            <label htmlFor="image_send">
              <img
                src="/icons/send_image.png"
                alt=""
                style={{ cursor: "pointer" }}
              />
            </label>
            <input type="file" id="image_send" />
            <input type="text" name="message" id="message" placeholder="Aa" />
            <button>
              <img src="/icons/send.png" alt="" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
