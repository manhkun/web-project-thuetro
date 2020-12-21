import React, { useEffect, useState } from "react";
import messageApi from "../api/messageApi";
import HeaderChat from "../components/Helpers/Chat/HeaderChat";
import { Message, MyMessage } from "../components/Helpers/Chat/Message";
import UserChat from "../components/Helpers/Chat/UserChat";
import "./Chat.css";

function Chat() {
  const [dataUser, setDataUser] = useState([]);
  const [message, setMessage] = useState("");
  const ws = new WebSocket("ws://localhost:9999/v1/rent-house/chat");
  useEffect(() => {
    ws.onopen = () => {
      console.log("Connected");
      ws.send(sessionStorage.getItem("tokenOwner"));
    };
    ws.onmessage = (evt) => {
      const messages = JSON.parse(evt.data);
      console.log(messages);
    };
    console.log("ws");
    return () => ws.onclose;
  }, []);
  // useEffect(async () => {
  //   let res = await messageApi.getListUser();
  //   console.log(res.data);
  //   if (res.code === 200) setDataUser(res.data);
  //   let msg = await messageApi.getMessage();
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      message: message,
      image_link: "",
      owner_id: "kien1234",
    };
    ws.send(JSON.stringify(data));
  };
  return (
    <div>
      <div className="chat-container">
        <div className="chat-container__user">
          {dataUser.map((item) => {
            return <UserChat name={item.owner_full_name} />;
          })}
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
          <form
            className="chat-container__send"
            action=""
            onSubmit={handleSubmit}
          >
            <label htmlFor="image_send">
              <img
                src="/icons/send_image.png"
                alt=""
                style={{ cursor: "pointer" }}
              />
            </label>
            <input type="file" id="image_send" />
            <input
              type="text"
              name="message"
              id="message"
              placeholder="Aa"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">
              <img src="/icons/send.png" alt="" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
