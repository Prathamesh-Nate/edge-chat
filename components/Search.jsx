import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import Link from "next/link";
import { ChatContext } from "../context/ChatContext";

const Search = () => {
  const { setSearchAccount, searchAndAddFriend, handleSearchInput } = useContext(ChatContext);

  return (
    <div className="search">
      <div className="searchForm">
        <form className="form" onSubmit={searchAndAddFriend}>
          <input
            required
            type="text"
            placeholder="Enter Address to Add Friend"
            onChange={handleSearchInput}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default Search;
