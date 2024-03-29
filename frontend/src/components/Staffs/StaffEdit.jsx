import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import axios from "axios";
import {
  Button,
  Header,
  Image,
  Modal,
  Divider,
  Segment,
  Confirm,
} from "semantic-ui-react";

class StaffEdit extends Component {
  state = {
    open: false,
    deleted: false,
    confirmOpen: false,
    currentID: this.props.id,

    first_name: this.props.statistics.goals_all,
    last_name: this.props.statistics.goals_season,
    role: this.props.statistics.assist_all,
  };

  handleSave = async () => {
    await axios({
      url: `http://localhost:5000/staffs/${this.state.currentID}`,
      method: "put",
      data: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        role: this.state.role,
      },
      headers: setHeaders(),
    }).then((res) => this.setState({ open: false }));
    await this.props.callbackFromParent(!this.state.reload);
  };
  handleDelete = async () => {
    await axios({
      url: `http://localhost:5000/players/${this.state.currentPlayer._id}`,
      method: "delete",
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ body: response.data, open: false, confirmOpen: false });
      },
      (error) => {
        console.log(error);
      },
    );
    await this.props.callbackFromParent(!this.state.reload);
  };
  handleConfirm = () => {
    this.setState({ confirmOpen: !this.state.confirmOpen });
  };
  render() {
    return (
      <Modal
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        open={this.state.open}
        trigger={<Button>Edytuj statystyki</Button>}
      >
        <Modal.Header>
          Edycja pracownika:{" "}
          {this.state.currentStaff.first_name +
            " " +
            this.state.currentStaff.last_name}
        </Modal.Header>
        <Modal.Content image>
          <Image size="medium" src={foto} wrapped />

          <Modal.Description className="edit-modal-description">
            <Header> Statystyki:</Header>

            <Segment className="edit-modal-segment">
              <Divider horizontal>
                Goli w karierze: {this.state.goals_all}
              </Divider>

              <Button name="goals_all" onClick={this.handlePlus}>
                +
              </Button>
              <Button name="goals_all" onClick={this.handleMinus}>
                -
              </Button>
            </Segment>
            <Segment className="edit-modal-segment">
              <Divider horizontal>
                Goli w sezonie: {this.state.goals_season}
              </Divider>

              <Button name="goals_season" onClick={this.handlePlus}>
                +
              </Button>
              <Button name="goals_season" onClick={this.handleMinus}>
                -
              </Button>
            </Segment>
            <Segment className="edit-modal-segment">
              <Divider horizontal>
                Asyst w karierze: {this.state.assist_all}
              </Divider>

              <Button name="assist_all" onClick={this.handlePlus}>
                +
              </Button>
              <Button name="assist_all" onClick={this.handleMinus}>
                -
              </Button>
            </Segment>
            <Segment className="edit-modal-segment">
              <Divider horizontal>
                Asyst w sezonie: {this.state.assist_season}
              </Divider>

              <Button name="assist_season" onClick={this.handlePlus}>
                +
              </Button>
              <Button name="assist_season" onClick={this.handleMinus}>
                -
              </Button>
            </Segment>
            <Segment className="edit-modal-segment">
              <Divider horizontal>
                Meczy w karierze: {this.state.matches_all}
              </Divider>

              <Button name="matches_all" onClick={this.handlePlus}>
                +
              </Button>
              <Button name="matches_all" onClick={this.handleMinus}>
                -
              </Button>
            </Segment>
            <Segment className="edit-modal-segment">
              <Divider horizontal>
                {" "}
                Meczy w sezonie: {this.state.matches_season}
              </Divider>

              <Button name="matches_season" onClick={this.handlePlus}>
                +
              </Button>
              <Button name="matches_season" onClick={this.handleMinus}>
                -
              </Button>
            </Segment>
          </Modal.Description>
        </Modal.Content>
        <Divider horizontal>
          {" "}
          <Button negative onClick={this.handleConfirm}>
            USUŃ ZAWODNIKA{" "}
          </Button>
          <Confirm
            open={this.state.confirmOpen}
            onCancel={this.handleConfirm}
            onConfirm={this.handleDelete}
            content="Czy na pewno chcesz usunąć zawodnika?"
            cancelButton="Anuluj"
            confirmButton="Tak"
          />
        </Divider>
        <Modal.Actions>
          <Button
            content="Anuluj"
            labelPosition="right"
            icon="cancel"
            onClick={() => this.setState({ open: false })}
          />
          <Button
            content="Zapisz"
            labelPosition="right"
            icon="checkmark"
            onClick={this.handleSave}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default StaffEdit;
