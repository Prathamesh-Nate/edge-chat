import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Home from ".";
import { ChatContext } from "../context/ChatContext";

const Register = () => {
  const {
    networkError,
    isUserLoggedIn,
    connectWallet,
    setUsername,
    setPassword,
    registerUser,
  } = useContext(ChatContext);

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="form-container">
      <div className="bg-[#2d3250] px-10 py-14 rounded-xl flex flex-col gap-2 items-center">
        <span className="text-white font-bold text-2xl">EdgeChat</span>
        <span className="text-white text-lg">Register User</span>
        <form className="flex flex-col gap-4" onSubmit={registerUser}>
          <input
            className="form-input"
            required
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="form-input"
            required
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input 
          type="file" 
          className="file-input file-input-bordered file-input-primary w-full max-w-xs" />

          <button className="btn btn-primary" type="submit">Sign up</button>
        </form>
        <p className="py-5 px-5">
          Have an account already? <span className="text-violet-400"><Link href="/Login">Login</Link></span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
