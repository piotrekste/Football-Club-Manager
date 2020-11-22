import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import axios from "axios";
import { Button, Modal, TextArea, Form } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class StaffModal extends Component {
  state = {
    open: false,
    startDate: new Date(),
    city: "",
    street: "",
    description: "",
    reload: false,
    currentStaff: [],
  };
  getStaffByID = async () => {
    await axios({
      url: `http://localhost:5000/staffs/${this.props.id}`,
      method: "get",
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ currentStaff: response.data });
        //  console.log("pojedynczo", this.state.currentPlayer);
      },
      (error) => {
        console.log(error);
      },
    );
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
        city: this.state.city,
        street: this.state.street,
        description: this.state.description,
        date: this.state.startDate,
      },
    }).then((res) => this.setState({ body: res.data._id }));
    await this.props.callbackFromParent(!this.state.reload);
  };
  addTaskID = async () => {
    await axios({
      url: `http://localhost:5000/staffs/${this.props.id}/meeting_id`,
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
  handleAddButton = async () => {
    await this.addTask();
    await this.addTaskID();
    await this.setState({ open: false });
  };
  render() {
    return (
      <Modal
        size="tiny"
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        open={this.state.open}
        trigger={<Button color="vk"> Przydziel zadanie</Button>}
      >
        <Modal.Header>Dodaj nowe zadanie dla: {this.props.id} </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form className="plan-form">
              <TextArea
                rows={1}
                name="city"
                placeholder="Wpisz miasto"
                style={{
                  minHeight: "6vh",
                  maxHeight: "6vh",
                  marginBottom: "3vh",
                }}
                value={this.state.city}
                onChange={this.handleChange}
              />
              <TextArea
                rows={1}
                name="street"
                placeholder="Wpisz ulice"
                style={{
                  minHeight: "6vh",
                  maxHeight: "6vh",
                  marginBottom: "3vh",
                }}
                value={this.state.street}
                onChange={this.handleChange}
              />
              <TextArea
                rows={3}
                name="description"
                placeholder="Dodatkowe informacje"
                style={{
                  minHeight: "12vh",
                  maxHeight: "12vh",
                  marginBottom: "3vh",
                }}
                value={this.state.desription}
                onChange={this.handleChange}
              />{" "}
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
export default StaffModal;
