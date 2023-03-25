import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "./Message";
import Input from "./Input";
import AnimatedLetters from './AnimatedLetters/index';

const Chat = () => {
  const { selectedUserName } = useContext(ChatContext);
  return ( 
    <div className="chat-ui">
      <div className="chat-info">
        <span>{selectedUserName}</span>
      </div>
      {selectedUserName !=='' ?
      <>
        <Message />
        <Input />
      </> :
      <AnimatedLetters />}
    </div>
  );
};

export default Chat;
