import React from "react";

const Context = React.createContext();

export class StoreProvider extends React.Component {
  state = {
    isLogged: localStorage.getItem("token") ? true : false,
    role: localStorage.getItem("role") === "manager" ? true : false,
  };

  changeStore = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Context.Provider
        value={{ ...this.state, changeStore: this.changeStore }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
