import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import messageApi from "../api/messageApi";
import HeaderChat from "../components/Helpers/Chat/HeaderChat";
import { ListMessage } from "../components/Helpers/Chat/ListMessage";
import UserChat from "../components/Helpers/Chat/UserChat";
import "./Chat.css";

const ws = new WebSocket("ws://localhost:9999/v1/rent-house/chat/admin");

function Chat() {
  const { id } = useParams();
  const [listUser, setListUser] = useState([]);
  const [message, setMessage] = useState("");
  const [listMessage, setListMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const socket = useRef(null);
  const [reconnectInterval, setReconnectInterval] = useState(null);
  const [intervalHandle, setIntervalHandle] = useState(null);

  useEffect(() => {
    connect();

    socket.current.onopen = onOpen;
    socket.current.onclose = onClose;
    socket.current.onmessage = onMessage;
    socket.current.onerror = onError;

    return () => socket.current.close();
  }, []);

  useEffect(() => {
    setReconnectInterval(2000);
    console.log("set reconnect");
    return () => window.clearInterval(intervalHandle);
  }, []);

  useEffect(() => {
    if (reconnectInterval === null) {
      window.clearInterval(intervalHandle);
    } else {
      setIntervalHandle(
        window.setInterval(() => {
          connect();
          console.log("reconnecting...");
        }, reconnectInterval)
      );
    }
  }, [reconnectInterval]);
  function sendMessage(e) {
    e.preventDefault();
    let data = {
      message: message,
      image_link: "",
      owner_id: id,
    };
    const temp = JSON.stringify(data);
    socket.current.send(temp);
    let newSended = {
      admin_id: "admin",
      image_link: "",
      message: message,
      owner_id: id,
      send_time: new Date().getTime() / 1000,
      type: "admin_message",
    };
    setListMessage((prev) => [...prev, newSended]);
    setMessage("");
  }
  function connect() {
    socket.current = ws;
    setReconnectInterval(null);
  }

  function onOpen() {
    console.log("socket ready state", socket.current.readyState);
    socket.current.send(sessionStorage.getItem("tokenAdmin"));
  }

  function onClose() {
    setReconnectInterval(2000);
  }
  function onError(e) {
    console.log(e);
  }

  function onMessage(e) {
    const messages = JSON.parse(e.data);
    console.log("on message" + messages);
    setListMessage((prev) => [...prev, messages]);
    console.log(listMessage);
  }
  useEffect(async () => {
    let res = await messageApi.getListUser();
    if (res.code === 200) setListUser(res.data);
    let msg = await messageApi.getMessage(id);
    if (msg.code === 200) {
      setListMessage(msg.data.messages);
    }
    setLoading(true);
  }, [id]);

  return (
    <div>
      <div className="chat-container">
        <div className="chat-container__user">
          {listUser.map((item) => {
            return (
              <UserChat id={item.owner_name} name={item.owner_full_name} />
            );
          })}
        </div>
        <div className="chat-container__content">
          <HeaderChat></HeaderChat>
          <ListMessage data={listMessage}></ListMessage>
          <form
            className="chat-container__send"
            action=""
            onSubmit={sendMessage}
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
              value={message}
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
