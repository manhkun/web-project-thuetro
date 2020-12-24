import React, { useEffect, useState, useRef } from "react";
import messageApi from "../api/messageApi";
import HeaderChat from "../components/Helpers/Chat/HeaderChat";
import { ListMessage } from "../components/Helpers/Chat/ListMessage";
import "./Chat.css";

const ws = new WebSocket("ws://localhost:9999/v1/rent-house/chat/");

function Chat() {
  const [message, setMessage] = useState("");
  const [listMessage, setListMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  const socket = useRef(null);
  const [reconnectInterval, setReconnectInterval] = useState(null);
  const [intervalHandle, setIntervalHandle] = useState(null);

  useEffect(() => {
    connect();

    socket.current.onopen = onOpen();
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
    };
    const temp = JSON.stringify(data);
    socket.current.send(temp);
    let newSended = {
      admin_id: "admin",
      image_link: "",
      message: message,
      send_time: new Date().getTime() / 1000,
      type: "owner_message",
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
    socket.current.send(sessionStorage.getItem("tokenOwner"));
  }

  function onClose() {
    setReconnectInterval(2000);
  }
  function onError(e) {
    console.log(e);
  }

  function onMessage(e) {
    console.log(JSON.parse(e.data));
    let messages = JSON.parse(e.data);
    console.log("mess" + messages);
    setListMessage((prev) => [...prev, messages]);
  }
  useEffect(async () => {
    let msg = await messageApi.getMessage();
    if (msg.code === 200) {
      setListMessage(msg.data.messages);
    }
    setLoading(true);
  }, []);
  return (
    <div>
      <div className="chat-container">
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
