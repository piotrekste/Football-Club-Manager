import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import axios from "axios";
import {
  Button,
  Header,
  Image,
  Modal,
  TextArea,
  Form,
} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import foto from "../../img/matthew.png";
import "react-datepicker/dist/react-datepicker.css";
class PlanModal extends Component {
  state = {
    open: false,
    startDate: new Date(),
    place: "",
    description: "",
  };
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: e.target.value });
  };
  addTraining = async () => {
    await axios({
      url: `http://localhost:5000/trainings/`,
      method: "post",
      headers: setHeaders(),
      data: {
        place: this.state.place,
        description: this.state.description,
        date: this.state.startDate,
      },
    }).then((res) => this.setState({ body: res.data._id }));
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
          <Modal.Header>planowanie</Modal.Header>
          <Modal.Content image>
            <Image size="medium" src={foto} wrapped />
            <Modal.Description>
              <Header> jsjsjsjsj</Header>
              <p>zrobic dodawania indeksu do playera</p>kalendarz itp
              <Form className="plan-form">
                <TextArea
                  rows={1}
                  name="place"
                  placeholder="Wpisz miejsce treningu"
                  style={{ minHeight: 50, maxHeight: 50, marginBottom: 30 }}
                  value={this.state.place}
                  onChange={this.handleChange}
                />
                <TextArea
                  rows={3}
                  name="description"
                  placeholder="Opis "
                  style={{ minHeight: 100, maxHeight: 100, marginBottom: 30 }}
                  value={this.state.desription}
                  onChange={this.handleChange}
                />
                <div>
                  {" "}
                  <DatePicker
                    className="plan-datepicker"
                    selected={this.state.startDate}
                    onChange={(date) => this.setState({ startDate: date })}
                  />
                </div>{" "}
              </Form>
              <Button onClick={this.addTraining}>ok</Button>
            </Modal.Description>
          </Modal.Content>

          <Modal.Actions>
            <Button
              content="Zamknij"
              labelPosition="right"
              icon="checkmark"
              onClick={() => this.setState({ open: false })}
              positive
            />
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default PlanModal;
