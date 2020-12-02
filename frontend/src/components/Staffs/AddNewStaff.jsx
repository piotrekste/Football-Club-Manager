import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import axios from "axios";
import { message } from "antd";
import { Button, Modal, TextArea, Form } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
class AddNewStaff extends Component {
  state = {
    open: false,
    startDate: new Date(),
    first_name: "",
    last_name: "",
    role: "",
    password: "",
    login: "",
    reload: false,
  };
  handleChange = (e) => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };

  addStaff = async () => {
    await axios({
      url: `http://localhost:5000/staffs/`,
      method: "put",
      headers: setHeaders(),
      data: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password: "silne_haslo",
        role: this.state.role,
        login: this.state.login,
      },
    }).then((res) => this.setState({ addedID: res.data._id, open: false }));
  };

  handleAddButton = async () => {
    if (
      this.state.first_name === "" ||
      this.state.last_name === "" ||
      this.state.role === "" ||
      this.state.login === ""
    ) {
      message.error("Proszę wypełnić wszystkie pola!", 3);
    } else {
      await this.addStaff();

      await this.props.callbackFromParent(!this.state.reload);
      await this.setState({ open: false });
      message.success("Pomyślnie dodano pracownika!", 2);
    }
  };
  render() {
    return (
      <>
        <Modal
          className="add-player-form"
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          open={this.state.open}
          trigger={
            <Button className="add-player-button">
              DODAJ NOWEGO PRACOWNIKA
            </Button>
          }
        >
          <Modal.Header>Dodaj pracownika</Modal.Header>
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

                <TextArea
                  rows={3}
                  name="role"
                  placeholder="Stanowisko"
                  style={{
                    minHeight: 50,
                    minWidth: "100%",
                    maxWidth: "100%",
                    maxHeight: 50,
                    marginBottom: 30,
                  }}
                  value={this.state.role}
                  onChange={this.handleChange}
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

export default AddNewStaff;
