import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import axios from "axios";
import { message } from "antd";
import { Button, Image, Modal, TextArea, Form } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import foto from "../../img/matthew.png";
import "react-datepicker/dist/react-datepicker.css";
class PlanModal extends Component {
  state = {
    open: false,
    startDate: new Date(),
    place: "",
    description: "",
    duration: 1,
  };
  handleChange = (e) => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };
  addTraining = async () => {
    await axios({
      url: `http://localhost:5000/meetings/`,
      method: "post",
      headers: setHeaders(),
      data: {
        place: this.state.place,
        description: this.state.description,
        date: this.state.startDate,
        duration: this.state.duration,
      },
    }).then((res) => this.setState({ body: res.data._id, open: false }));

    //dodac dodawanie do playera
  };
  addTrainingID = async () => {
    await axios({
      url: `http://localhost:5000/players/${this.props.id}/meeting_id`,
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
      await this.addTraining();
      await this.addTrainingID();
      await this.props.callbackFromParent(!this.state.reload);
      await this.setState({ open: false });
      message.success("Dodano trening!", 2);
    }
  };
  render() {
    return (
      <>
        <Modal
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          open={this.state.open}
          trigger={<Button>Zaplanuj trening</Button>}
        >
          <Modal.Header>Zaplanuj nowy trening</Modal.Header>
          <Modal.Content image>
            <Image size="medium" src={foto} wrapped />
            <Modal.Description>
              <Form className="plan-form">
                <TextArea
                  rows={3}
                  name="description"
                  placeholder="Tytuł"
                  style={{ minHeight: 100, maxHeight: 100, marginBottom: 30 }}
                  value={this.state.desription}
                  onChange={this.handleChange}
                />
                <TextArea
                  rows={1}
                  name="place"
                  placeholder="Wpisz miejsce treningu"
                  style={{ minHeight: 50, maxHeight: 50, marginBottom: 30 }}
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
      </>
    );
  }
}

export default PlanModal;
