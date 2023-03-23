import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import Link from "next/link";
import { ChatContext } from "../context/ChatContext";
import Register from "./Register";
import Home from ".";
const Login = () => {
  const [err, setErr] = useState(false);

  const {
    networkError,
    isUserLoggedIn,
    connectWallet,
    setUsername,
    setPassword,
    loginUser,
  } = useContext(ChatContext);

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <>
      {!isUserLoggedIn && !networkError ? (
        <Home />
      ) : (
        <div className="form-container">
          <div className="bg-[#2d3250] px-10 py-8 rounded-xl flex flex-col gap-2 items-center">
            <span className="text-white font-bold text-2xl">EdgeChat</span>
            <span className="text-white text-lg">Login</span>
            <form className="flex flex-col gap-4" onSubmit={loginUser}>
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
              <button className="btn btn-primary" type="submit">Sign In</button>
              {err && <span>Something went wrong</span>}
            </form>
            <p className="py-5 px-5">
              Don&apos;t have an account?{" "}
              <span className="text-violet-400"><Link href="/Register">Register</Link></span>
            </p>



          </div>
        </div>
      )}
    </>
  );
};

export default Login;
