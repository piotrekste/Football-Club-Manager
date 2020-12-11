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
    hours: "12",
    minutes: "00",
  };
  handleChange = (e) => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };
  handleSelectChange = (e) => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
    console.log(this.state.hours, this.state.minutes);
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

  handleAddButton = async () => {
    if (this.state.place === "" || this.state.description === "") {
      message.error("Proszę wypełnić wszystkie pola!", 3);
    } else {
      await this.setState({
        startDate: this.state.startDate.setHours(
          this.state.hours,
          this.state.minutes,
        ),
      });
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
        onOpen={() =>
          this.setState({
            open: true,
            startDate: new Date(),
            city: "",
            place: "",
            description: "",

            hours: "12",
            minutes: "00",
          })
        }
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
              Wybierz datę: <br />
              <DatePicker
                className="plan-datepicker"
                selected={this.state.startDate}
                onChange={(date) => this.setState({ startDate: date })}
              />
              <br /> <br />
              Wybierz godzinę: <br />
              <select
                className="time-picker"
                value={this.state.hours}
                onChange={this.handleSelectChange}
                name="hours"
              >
                <option value="8" name="8">
                  8
                </option>
                <option value="9" name="9">
                  9
                </option>
                <option value="10" name="10">
                  10
                </option>
                <option value="11" name="11">
                  11
                </option>
                <option value="12" name="12">
                  12
                </option>
                <option value="13" name="13">
                  13
                </option>
                <option value="14" name="14">
                  14
                </option>
                <option value="15" name="15">
                  15
                </option>
                <option value="16" name="16">
                  16
                </option>
                <option value="17" name="17">
                  17
                </option>
                <option value="18" name="18">
                  18
                </option>
                <option value="19" name="19">
                  19
                </option>
                <option value="20" name="20">
                  20
                </option>
                <option value="21" name="21">
                  21
                </option>
                <option value="22" name="22">
                  22
                </option>{" "}
                <option value="23" name="23">
                  23
                </option>
                <option value="24" name="24">
                  24
                </option>
              </select>
              <select
                className="time-picker"
                value={this.state.minutes}
                onChange={this.handleSelectChange}
                name="minutes"
              >
                <option value="00" name="00">
                  00
                </option>
                <option value="15" name="15">
                  15
                </option>
                <option value="30" name="30">
                  30
                </option>
                <option value="45" name="45">
                  45
                </option>
              </select>
              <br />
              <br />
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
