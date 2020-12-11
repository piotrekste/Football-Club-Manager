import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import axios from "axios";
import { Button, Modal, TextArea, Form } from "semantic-ui-react";
import { message } from "antd";
class BuildingsManage extends Component {
  state = {
    open: false,
    deleted: false,
    confirmOpen: false,
    currentID: this.props.id,
    currentBuilding: "",
    name: "",
    description: "",
    capacity: "",
    costs: "",
    income: "",
    reload: false,
  };
  getBuildingByID = async () => {
    await axios({
      url: `http://localhost:5000/building/${this.props.id}`,
      method: "get",
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ currentBuilding: response.data });
        //  console.log("pojedynczo", this.state.currentPlayer);
      },
      (error) => {
        console.log(error);
      },
    );
  };
  handleSave = async () => {
    await axios({
      url: `http://localhost:5000/building/${this.state.currentID}`,
      method: "put",
      data: {
        name: this.state.name,
        description: this.state.description,
        capacity: this.state.capacity,
        costs: this.state.costs,
        income: this.state.income,
      },
      headers: setHeaders(),
    }).then((res) => this.setState({ open: false }));
    await this.props.callbackFromParent(!this.state.reload);
  };

  handleSaveButton = async () => {
    if (
      this.state.name === "" ||
      this.state.description === "" ||
      this.state.capacity === "" ||
      this.state.costs === "" ||
      this.state.income === ""
    ) {
      message.error("Proszę wypełnić wszystkie pola!", 3);
    } else {
      await this.handleSave();

      message.success("Budynek pomyślnie edytowany!", 2);
    }
  };
  handleChange = (e) => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };
  componentDidMount = async () => {
    await this.getBuildingByID();
    await this.setState({
      name: this.state.currentBuilding.name,
      description: this.state.currentBuilding.description,
      capacity: this.state.currentBuilding.capacity,
      costs: this.state.currentBuilding.costs,
      income: this.state.currentBuilding.income,
    });
  };
  render() {
    return (
      <>
        <Modal
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          open={this.state.open}
          trigger={<Button>Zarządzaj</Button>}
          className="edit-building-form"
        >
          <Modal.Header>Edytuj budynek klubowy</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                Nazwa:
                <TextArea
                  rows={3}
                  name="name"
                  placeholder={this.state.currentBuilding.name}
                  style={{ minHeight: 50, maxHeight: 50, marginBottom: 10 }}
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                Opis:
                <TextArea
                  rows={1}
                  name="description"
                  placeholder={this.state.currentBuilding.description}
                  style={{ minHeight: 100, maxHeight: 100, marginBottom: 10 }}
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                Pojemność:
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={this.state.capacity}
                  placeholder={this.state.currentBuilding.capacity}
                  style={{ minHeight: 50, maxHeight: 50, marginBottom: 10 }}
                  onChange={this.handleChange}
                  min="0"
                />
                Koszty utrzymania:
                <input
                  type="number"
                  id="costs"
                  name="costs"
                  value={this.state.costs}
                  placeholder={this.state.currentBuilding.costs}
                  style={{ minHeight: 50, maxHeight: 50, marginBottom: 10 }}
                  onChange={this.handleChange}
                  min="0"
                />
                Wpływy:
                <input
                  type="number"
                  id="income"
                  name="income"
                  value={this.state.income}
                  placeholder={this.state.currentBuilding.income}
                  style={{ minHeight: 50, maxHeight: 50, marginBottom: 10 }}
                  onChange={this.handleChange}
                  min="0"
                />
              </Form>
            </Modal.Description>
          </Modal.Content>

          <Modal.Actions>
            <Button negative onClick={() => this.setState({ open: false })}>
              Anuluj
            </Button>
            <Button
              content="Zapisz"
              labelPosition="right"
              icon="checkmark"
              onClick={this.handleSaveButton}
              positive
            />
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default BuildingsManage;
