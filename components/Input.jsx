import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import Link from "next/link";
import { ChatContext } from "../context/ChatContext";

const Input = () => {
  const { setSearchAccount, searchAndAddFriend, setMessageInput, sendMessage, handleMessageInput,showSendButton } =
    useContext(ChatContext);

  return (
    <div className="chat-input">
      <input
        id="input-field"
        required
        type="text"
        placeholder="Type something..."
        onChange={handleMessageInput}
      />
      {showSendButton && <button onClick={sendMessage}>Send</button>}     
    </div>
  );
};

export default Input;
