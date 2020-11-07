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
import foto from "../../img/matthew.png";
class EditModal extends Component {
  state = {
    open: false,
    deleted: false,
    confirmOpen: false,
    currentPlayer: this.props.player,
    currentStatistics: this.props.statistics,
    goals_all: this.props.statistics.goals_all,
    goals_season: this.props.statistics.goals_season,
    assist_all: this.props.statistics.assist_all,
    assist_season: this.props.statistics.assist_season,
    matches_all: this.props.statistics.matches_all,
    matches_season: this.props.statistics.matches_season,
  };

  handlePlus = (e) => {
    const { value, name } = e.target;
    //await this.setState({ [name]: value });
    // const { goals_all} = this.state;
    if (name === "goals_all") {
      this.setState({ [name]: this.state.goals_all + 1 });
    }
    if (name === "goals_season") {
      this.setState({ [name]: this.state.goals_season + 1 });
    }
    if (name === "assist_all") {
      this.setState({ [name]: this.state.assist_all + 1 });
    }
    if (name === "assist_season") {
      this.setState({ [name]: this.state.assist_season + 1 });
    }
    if (name === "matches_season") {
      this.setState({ [name]: this.state.matches_season + 1 });
    }
    if (name === "matches_all") {
      this.setState({ [name]: this.state.matches_all + 1 });
    }
  };

  handleMinus = (e) => {
    const { value, name } = e.target;
    //await this.setState({ [name]: value });
    // const { goals_all} = this.state;
    if (name === "goals_all" && this.state.goals_all > 0) {
      this.setState({ [name]: this.state.goals_all - 1 });
    }
    if (name === "goals_season" && this.state.goals_season > 0) {
      this.setState({ [name]: this.state.goals_season - 1 });
    }
    if (name === "assist_all" && this.state.assist_all > 0) {
      this.setState({ [name]: this.state.assist_all - 1 });
    }
    if (name === "assist_season" && this.state.assist_season > 0) {
      this.setState({ [name]: this.state.assist_season - 1 });
    }
    if (name === "matches_season" && this.state.matches_season > 0) {
      this.setState({ [name]: this.state.matches_season - 1 });
    }
    if (name === "matches_all" && this.state.matches_all > 0) {
      this.setState({ [name]: this.state.matches_all - 1 });
    }
  };

  handleSave = async () => {
    await axios({
      url: `http://localhost:5000/statistics/${this.state.currentPlayer.statistics_id}`,
      method: "put",
      data: {
        goals_all: this.state.goals_all,
        goals_season: this.state.goals_season,
        assist_all: this.state.assist_all,
        assist_season: this.state.assist_season,
        matches_all: this.state.matches_all,
        matches_season: this.state.matches_season,
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
          Edycja piłkarza:{" "}
          {this.state.currentPlayer.first_name +
            " " +
            this.state.currentPlayer.last_name}
        </Modal.Header>
        <Modal.Content image>
          <Image size="medium" src={foto} wrapped />

          <Modal.Description className="edit-modal-description">
            <Header>
              {" "}
              Statystyki:{this.state.currentPlayer.statistics_id}
            </Header>

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

export default EditModal;
