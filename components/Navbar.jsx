import React, { useState, useEffect, useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Navbar = () => {
  const { networkError, isUserLoggedIn, logoutUser } = useContext(ChatContext);
  return (
    <div className="main-navigation">
      <span className="navbar-logo font-poppins">EdgeChat</span>
        <button className="logout-btn" onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default Navbar;
