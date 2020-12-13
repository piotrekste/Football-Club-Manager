import React, { Component } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import axios from "axios";
import Store from "../../Store";
import setHeaders from "../../utils/setHeaders";
import { Redirect } from "react-router-dom";
import { message } from "antd";
class LoginContent extends Component {
  state = {
    login: "",
    password: "",
    invalidData: false,
  };

  static contextType = Store;
  authStaffUser = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/staffs",
        headers: setHeaders(),
        data: {
          login: this.state.login,
          password: this.state.password,
        },
      });
      if (res.status === 200) {
        // const token = res.headers["x-auth-token"];
        //localStorage.setItem("token", token);
        console.log("calosc", res);
        const token = res.headers["x-auth-token"];
        localStorage.setItem("token", token);
        localStorage.setItem("id", res.data._id);
        localStorage.setItem("first_name", res.data.first_name);
        localStorage.setItem("last_name", res.data.last_name);
        localStorage.setItem("role", "staff");
        localStorage.setItem("isLogged", true);
        this.context.changeStore("isLogged", true);
        this.context.changeStore("role", false);
        document.location.href = "/homepage";
      }
    } catch (err) {
      this.setState({ invalidData: true });
    }
  };

  authPlayerUser = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/players",
        headers: setHeaders(),
        data: {
          login: this.state.login,
          password: this.state.password,
        },
      });
      if (res.status === 200) {
        console.log("calosc", res);
        const token = res.headers["x-auth-token"];
        localStorage.setItem("token", token);
        localStorage.setItem("id", res.data._id);
        localStorage.setItem("first_name", res.data.first_name);
        localStorage.setItem("last_name", res.data.last_name);
        localStorage.setItem("role", "player");

        localStorage.setItem("isLogged", true);
        this.context.changeStore("isLogged", true);
        this.context.changeStore("role", false);
        document.location.href = "/homepage";
      }
    } catch (err) {
      this.setState({ invalidData: true });
    }
  };

  authManagerUser = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/managers",
        headers: setHeaders(),
        data: {
          login: this.state.login,
          password: this.state.password,
        },
      });
      if (res.status === 200) {
        console.log("calosc", res);
        const token = res.headers["x-auth-token"];
        localStorage.setItem("token", token);
        localStorage.setItem("id", res.data._id);
        localStorage.setItem("first_name", res.data.first_name);
        localStorage.setItem("last_name", res.data.last_name);
        localStorage.setItem("role", "manager");

        localStorage.setItem("isLogged", true);
        this.context.changeStore("isLogged", true);
        this.context.changeStore("role", true);

        document.location.href = "/homepage";
      }
    } catch (err) {
      this.setState({ invalidData: true });
    }
  };
  onButtonSubmit = async (e) => {
    if (this.state.login === "" || this.state.password === "") {
      message.error("Proszę wypełnić wszystkie pola!", 3);
    } else {
      e.preventDefault();

      await this.authPlayerUser();
      await this.authManagerUser();
      await this.authStaffUser();
      this.loginValidate();
    }
  };
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  loginValidate = () => {
    if (this.state.invalidData) {
      message.error("Błędny login lub hasło!", 2);
    } else {
      return null;
      //console.log("poprawne dane");
    }
  };
  render() {
    if (this.context.isLogged) return <Redirect to="/homepage" />;
    return (
      <Grid
        textAlign="center"
        style={{ height: "90vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="black" textAlign="center">
            Log in to your account!
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                name="login"
                iconPosition="left"
                placeholder="Login"
                onChange={this.handleChange}
                value={this.state.login}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
                onChange={this.handleChange}
                value={this.state.password}
              />

              <Button
                color="black"
                fluid
                size="large"
                onClick={this.onButtonSubmit}
              >
                Log in
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginContent;
