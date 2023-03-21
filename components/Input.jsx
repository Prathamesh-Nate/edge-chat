import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import Link from "next/link";
import { ChatContext } from "../context/ChatContext";

const Input = () => {
  const { setSearchAccount, searchAndAddFriend, setMessageInput, sendMessage } =
    useContext(ChatContext);

  return (
    <div className="chat-input">
  <input
        required
        type="text"
        placeholder="Type something..."
        onChange={(e) => setMessageInput(e.target.value)}
      />
      
        <button onClick={sendMessage}>Send</button>
      
</div>
  );
};

export default Input;
