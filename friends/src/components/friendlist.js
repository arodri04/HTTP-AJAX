import React, { Component } from "react";
import axios from "axios";

export default class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/friends")
      .then(response => {
        this.setState(() => ({ friends: response.data }));
      })
      .catch(error => {
        console.error("Error", error);
      });
  }

  render() {
    return (
      <div className="friendlist">
        {this.state.friends.map(friend => (
          <FriendDetail key={friend.id} friend={friend} />
        ))}
      </div>
    );
  }
}

function FriendDetail({ friend }) {
  const { name, age, email } = friend;
  return (
    <div className="friendcard">
      <h2>{name}</h2>
      <div>Age: {age}</div>
      <div>Email: {email}</div>
    </div>
  );
}
