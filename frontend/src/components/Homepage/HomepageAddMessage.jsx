import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import axios from "axios";
import moment from "moment";
import { message } from "antd";
import { Button, Modal, TextArea, Form } from "semantic-ui-react";
class HomepageAddMessage extends Component {
  state = {
    open: false,
    title: "",
    description: "",
    reload: false,
    owner:
      localStorage.getItem("role").toUpperCase() +
      " - " +
      localStorage.getItem("first_name") +
      " " +
      localStorage.getItem("last_name"),
  };
  handleChange = (e) => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };
  addTask = async () => {
    await axios({
      url: `http://localhost:5000/messages/`,
      method: "post",
      headers: setHeaders(),
      data: {
        date: moment().toDate(),
        owner: this.state.owner,
        description: this.state.description,
        title: this.state.title,
      },
    }).then((res) => this.setState({ body: res.data._id }));
    //await this.props.callbackFromParent(!this.state.reload);
    await this.props.callbackFromParent(!this.state.reload);
  };
  handleAddButton = async () => {
    if (
      // this.state.duration === "" ||
      this.state.title === "" ||
      this.state.description === ""
    ) {
      message.error("Proszę wypełnić wszystkie pola!", 3);
    } else {
      await this.addTask();
      await this.setState({ open: false, reload: false });

      message.success("Wiadomość wysłana!", 2);
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
          <Button style={{ width: "100%" }} color="vk">
            {" "}
            Wyslij wiadomość
          </Button>
        }
      >
        <Modal.Header> Wyslij globalną wiadomość</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form className="plan-form">
              <TextArea
                rows={1}
                name="title"
                placeholder="Wpisz tytuł"
                style={{
                  minHeight: "6vh",
                  maxHeight: "6vh",
                  marginBottom: "3vh",
                }}
                value={this.state.title}
                onChange={this.handleChange}
              />
              <TextArea
                rows={1}
                name="description"
                placeholder="Wpisz wiadomość"
                style={{
                  minHeight: "8vh",
                  maxHeight: "8vh",
                  marginBottom: "3vh",
                }}
                value={this.state.description}
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
    );
  }
}
export default HomepageAddMessage;
