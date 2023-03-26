import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { ChatContext } from "../context/ChatContext";
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChatHome() {
  const { connectWallet } = useContext(ChatContext);

  useEffect(() => {
    connectWallet();
  }, []);
  return (
    <div className="card">
      <div className="content-container">
      <ToastContainer
        position="top-center"
        transition={Zoom}
        autoClose={5000}
        limit={5}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default ChatHome;
