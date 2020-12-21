import React from "react";
import "./UserChat.css";

function UserChat(props) {
  return (
    <div className="user-chat__container">
      <img src="/icons/profile 1.png" alt="" />
      <h4>{props.name}</h4>
      <p className="user-chat__last">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, ab
        mollitia. Molestias asperiores tempore recusandae, nihil doloremque
        consequuntur incidunt! Necessitatibus laboriosam distinctio delectus
        animi voluptates veniam itaque sit iusto quae!
      </p>
    </div>
  );
}

export default UserChat;
