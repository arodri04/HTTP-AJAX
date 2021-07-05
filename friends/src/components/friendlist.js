import React, { Component } from "react";
import axios from "axios";
import FriendForm from "./friendform.js";
import UpdatePerson from "./updateform.js";
export default class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      friend: {
        name: "",
        age: "",
        email: ""
      }
    };
  }
  changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "age") {
      value = parseInt(value, 10);
    }

    this.setState(prevState => ({
      friend: {
        ...prevState.friend,
        [ev.target.name]: value
      }
    }));
  };
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

  addPerson = newPerson => {
    axios
      .post("http://localhost:5000/friends", newPerson)
      .then(res => {
        this.setState({ friends: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  DeletePerson = id => {
    console.log(id);
    axios
      .delete(`http://localhost:5000/friends/${id}`)
      .then(res => {
        this.setState({ friends: res.data });
      })
      .catch(err => console.log(err));
  };
  UpdatePerson = fr => {
    axios
      .put(`http://localhost:5000/friends/${fr.id}`, this.state.friend)
      .then(res => {
        this.setState({ friends: res.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="friendlist">
        {this.state.friends.map(friend => (
          <div>
            <div className="friendcard">
              <h2>{friend.name}</h2>
              <div>Age: {friend.age}</div>
              <div>Email: {friend.email}</div>
              <button onClick={() => this.DeletePerson(friend.id)}>
                Remove Friend
              </button>
              <button onClick={() => this.UpdatePerson(friend)}>
                Update Friend
              </button>
            </div>
          </div>
        ))}
        <FriendForm addPerson={this.addPerson} />
        <div className="friendform">
          <h2>Update Friend</h2>

          <input
            type="text"
            name="name"
            onChange={this.changeHandler}
            placeholder="name"
            value={this.state.friend.name}
          />

          <input
            type="number"
            name="age"
            onChange={this.changeHandler}
            placeholder="age"
            value={this.state.friend.age}
          />

          <input
            type="string"
            name="email"
            onChange={this.changeHandler}
            placeholder="email"
            value={this.state.friend.email}
          />
        </div>
      </div>
    );
  }
}

// function FriendDetail({ friend }) {
//   const handleClick = e => {
//     props.DeletePerson(friend.id);
//   };
//   const { name, age, email } = friend;
//   return (
//     <div>
//       <div className="friendcard">
//         <h2>{name}</h2>
//         <div>Age: {age}</div>
//         <div>Email: {email}</div>
//         <button onClick={handleClick}>Remove Friend</button>
//       </div>
//     </div>
//   );
// }
