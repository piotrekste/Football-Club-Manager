import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import axios from "axios";
import { Button, Modal, TextArea, Form } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { message } from "antd";
class AddTask extends Component {
  state = {
    open: false,
    startDate: new Date(),
    city: "",
    street: "",
    description: "",
    reload: false,
  };
  handleChange = (e) => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };
  addTask = async () => {
    await axios({
      url: `http://localhost:5000/meetings/`,
      method: "post",
      headers: setHeaders(),
      data: {
        place: this.state.place,
        duration: this.state.duration,
        description: this.state.description,
        date: this.state.startDate,
      },
    }).then((res) => this.setState({ body: res.data._id }));
  };
  addTaskID = async () => {
    await axios({
      url: `http://localhost:5000/managers/${localStorage.getItem(
        "id",
      )}/meeting_id`,
      method: "put",
      headers: setHeaders(),
      data: {
        meeting_id: {
          _id: this.state.body,
        },
      },
    }).then(
      (res) => {},
      (error) => {
        console.log(error);
      },
    );
  };
  handleSelectChange = (event) => {
    this.setState({ duration: event.target.value });
  };
  handleAddButton = async () => {
    if (
      this.state.duration === "" ||
      this.state.place === "" ||
      this.state.description === ""
    ) {
      message.error("Proszę wypełnić wszystkie pola!", 3);
    } else {
      await this.addTask();

      await this.addTaskID();

      await this.props.callbackFromParent(!this.state.reload);
      await this.setState({ open: false });
      message.success("Dodano zadanie!", 2);
    }
  };
  render() {
    return (
      <Modal
        size="tiny"
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        open={this.state.open}
        trigger={
          <Button style={{ width: "70%" }} color="vk">
            {" "}
            Dodaj nowe moje zadanie
          </Button>
        }
      >
        <Modal.Header>Dodaj nowe moje zadanie</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form className="plan-form">
              <TextArea
                rows={3}
                name="description"
                placeholder="Tytuł"
                style={{
                  minHeight: "8vh",
                  maxHeight: "8vh",
                  marginBottom: "3vh",
                }}
                value={this.state.desription}
                onChange={this.handleChange}
              />{" "}
              <TextArea
                rows={1}
                name="place"
                placeholder="Miejsce"
                style={{
                  minHeight: "6vh",
                  maxHeight: "6vh",
                  marginBottom: "3vh",
                }}
                value={this.state.place}
                onChange={this.handleChange}
              />
              Czas trwania (w godzinach): <br />
              <select
                value={this.state.duration}
                onChange={this.handleSelectChange}
              >
                <option value="1" name="1">
                  1
                </option>
                <option value="2" name="2">
                  2
                </option>
                <option value="3" name="3">
                  3
                </option>
              </select>
              <br />
              Wybierz datę: <br />
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
    );
  }
}
export default AddTask;
