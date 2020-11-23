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
    description: "",
    reload: false,
  };
  handleChange = (e) => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };
  addTask = async () => {
    await axios({
      url: `http://localhost:5000/globals/`,
      method: "post",
      headers: setHeaders(),
      data: {
        city: this.state.city,
        description: this.state.description,
        date: this.state.startDate,
      },
    }).then((res) => this.setState({ body: res.data._id }));
    await this.props.callbackFromParent(!this.state.reload);
  };
  handleAddButton = () => {
    if (
      // this.state.duration === "" ||
      this.state.city === "" ||
      this.state.description === ""
    ) {
      message.error("Proszę wypełnić wszystkie pola!", 3);
    } else {
      this.addTask();
      this.setState({ open: false });
      message.success("Dodano globalne wydarzenie!", 2);
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
            Dodaj nowe globalne zadanie
          </Button>
        }
      >
        <Modal.Header>Dodaj nowe globalne zadanie</Modal.Header>
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
                value={this.state.description}
                onChange={this.handleChange}
              />{" "}
              <TextArea
                rows={1}
                name="city"
                placeholder="Miejsce"
                style={{
                  minHeight: "6vh",
                  maxHeight: "6vh",
                  marginBottom: "3vh",
                }}
                value={this.state.city}
                onChange={this.handleChange}
              />
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
