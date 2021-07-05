import React from "react";

class FriendForm extends React.Component {
  state = {
    friend: {
      name: "",
      age: "",
      email: ""
    }
  };

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

  handleSubmit = event => {
    event.preventDefault();
    this.props.addPerson(this.state.friend);
  };

  render() {
    return (
      <div className="friendform">
        <h2>New Friend</h2>
        <form onSubmit={this.handleSubmit}>
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

          <button>Add New friend</button>
        </form>
      </div>
    );
  }
}

export default FriendForm;
