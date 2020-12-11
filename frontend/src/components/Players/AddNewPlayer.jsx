import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import axios from "axios";
import { message } from "antd";
import { Button, Modal, TextArea, Form } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
class AddNewPlayer extends Component {
  state = {
    open: false,
    startDate: new Date(),
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    position: "",
    birth: "",
    login: "",
    addedID: "",
    statisticsID: "",
    height: "",
    weight: "",
    foot: "",
    reload: false,
  };
  handleChange = (e) => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };
  handleSelectChange = (event) => {
    const { name } = event.target;

    this.setState({ [name]: event.target.value });
    console.log(this.state.position);
  };
  addPlayer = async () => {
    await axios({
      url: `http://localhost:5000/players/`,
      method: "put",
      headers: setHeaders(),
      data: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.first_name + "@" + this.state.last_name + ".com",
        password: "silne_haslo",
        position: this.state.position,
        birth: this.state.startDate,
        login: this.state.login,
        statistics_id: [this.state.statisticsID],
      },
    }).then((res) => this.setState({ addedID: res.data._id, open: false }));
  };
  addStatisticsID = async () => {
    await axios({
      url: `http://localhost:5000/statistics/`,
      method: "put",
      headers: setHeaders(),
      data: {
        foot: this.state.foot,
        height: this.state.height,
        weight: this.state.weight,
      },
    }).then((res) =>
      this.setState({ statisticsID: res.data._id, open: false }),
    );
  };

  handleAddButton = async () => {
    if (
      this.state.first_name === "" ||
      this.state.last_name === "" ||
      this.state.height === "" ||
      this.state.weight === "" ||
      this.state.login === ""
    ) {
      message.error("Proszę wypełnić wszystkie pola!", 3);
    } else {
      await this.addStatisticsID();

      await this.addPlayer();

      await this.props.callbackFromParent(!this.state.reload);
      await this.setState({ open: false });
      message.success("Pomyślnie dodano zawodnika!", 2);
      await this.setState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        position: "",
        birth: "",
        login: "",
        height: "",
        weight: "",
        foot: "",
      });
    }
  };
  render() {
    return (
      <>
        <Modal
          className="add-player-form"
          onClose={() => this.setState({ open: false })}
          onOpen={() =>
            this.setState({
              open: true,
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              position: "",
              birth: "",
              login: "",
              height: "",
              weight: "",
              foot: "",
            })
          }
          open={this.state.open}
          trigger={
            <Button className="add-player-button">
              DODAJ NOWEGO ZAWODNIKA
            </Button>
          }
        >
          <Modal.Header>Dodaj zawodnika</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form style={{ textAlign: "center" }}>
                <TextArea
                  rows={3}
                  name="first_name"
                  placeholder="Imię"
                  style={{
                    minHeight: 50,
                    minWidth: "100%",
                    maxWidth: "100%",
                    maxHeight: 50,
                    marginBottom: 30,
                  }}
                  value={this.state.first_name}
                  onChange={this.handleChange}
                />
                <TextArea
                  rows={3}
                  name="last_name"
                  placeholder="Nazwisko"
                  style={{
                    minHeight: 50,
                    minWidth: "100%",
                    maxWidth: "100%",
                    maxHeight: 50,
                    marginBottom: 30,
                  }}
                  value={this.state.last_name}
                  onChange={this.handleChange}
                />
                <TextArea
                  rows={3}
                  name="login"
                  placeholder="Login"
                  style={{
                    minHeight: 50,
                    minWidth: "100%",
                    maxWidth: "100%",
                    maxHeight: 50,
                    marginBottom: 30,
                  }}
                  value={this.state.login}
                  onChange={this.handleChange}
                />
                <select
                  value={this.state.position}
                  onChange={this.handleSelectChange}
                  name="position"
                  style={{
                    minHeight: 50,
                    minWidth: "100%",
                    maxWidth: "100%",
                    maxHeight: 50,
                    marginBottom: 30,
                  }}
                >
                  <option value="napastnik" name="napastnik">
                    Napastnik
                  </option>
                  <option value="obronca" name="obronca">
                    Obronca
                  </option>
                  <option value="pomocnik" name="pomocnik">
                    Pomocnik
                  </option>
                  <option value="bramkarz" name="bramkarz">
                    Bramkarz
                  </option>
                </select>
                <input
                  type="number"
                  id="height"
                  name="height"
                  placeholder="Wzrost"
                  value={this.state.height}
                  style={{
                    minHeight: 50,
                    minWidth: "100%",
                    maxWidth: "100%",
                    maxHeight: 50,
                    marginBottom: 30,
                  }}
                  onChange={this.handleChange}
                  min="100"
                />
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  placeholder="Waga"
                  value={this.state.weight}
                  style={{
                    minHeight: 50,
                    minWidth: "100%",
                    maxWidth: "100%",
                    maxHeight: 50,
                    marginBottom: 30,
                  }}
                  onChange={this.handleChange}
                  min="40"
                />
                <select
                  value={this.state.foot}
                  onChange={this.handleSelectChange}
                  name="foot"
                  style={{
                    minHeight: 50,
                    minWidth: "100%",
                    maxWidth: "100%",
                    maxHeight: 50,
                    marginBottom: 30,
                  }}
                >
                  <option value="right" name="right">
                    Prawonożny
                  </option>
                  <option value="left" name="left">
                    Lewonożny
                  </option>
                </select>
                Data urodzenia: <br />
                <DatePicker
                  className="plan-datepicker"
                  selected={this.state.startDate}
                  onChange={(date) => this.setState({ startDate: date })}
                />
              </Form>
            </Modal.Description>
          </Modal.Content>

          <Modal.Actions>
            <Button negative onClick={() => this.setState({ open: false })}>
              Anuluj
            </Button>
            <Button
              content="Dodaj"
              labelPosition="right"
              icon="checkmark"
              onClick={this.handleAddButton}
              positive
            />
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default AddNewPlayer;
