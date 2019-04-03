import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import FriendList from "./components/friendlist.js";

class App extends Component {
  render() {
    return (
      <div className="main">
        <h1>These are all my friends</h1>
        <FriendList />
      </div>
    );
  }
}

export default App;
