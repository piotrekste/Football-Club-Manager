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
    title: "",
    time: "10:00",
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
      url: `http://localhost:5000/globals/`,
      method: "post",
      headers: setHeaders(),
      data: {
        city: this.state.city,
        description: this.state.description,
        date: this.state.startDate,
        title: this.state.title,
      },
    }).then((res) => this.setState({ body: res.data._id }));
    await this.props.callbackFromParent(!this.state.reload);
  };
  handleAddButton = async () => {
    if (
      this.state.city === "" ||
      this.state.description === "" ||
      this.state.title === ""
    ) {
      message.error("Proszę wypełnić wszystkie pola!", 3);
    } else {
      await this.setState({
        startDate: this.state.startDate.setHours(
          this.state.hours,
          this.state.minutes,
        ),
      });

      await this.addTask();
      await this.setState({ open: false });
      message.success("Dodano globalne wydarzenie!", 2);
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
            description: "",
            title: "",
            time: "10:00",
            hours: "12",
            minutes: "00",
          })
        }
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
              <TextArea
                rows={1}
                name="title"
                placeholder="Kategoria wydarzenia"
                style={{
                  minHeight: "6vh",
                  maxHeight: "6vh",
                  marginBottom: "3vh",
                }}
                value={this.state.title}
                onChange={this.handleChange}
              />
              Wybierz datę: <br />
              <DatePicker
                className="plan-datepicker-timetable"
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
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions style={{ clear: "both" }}>
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
