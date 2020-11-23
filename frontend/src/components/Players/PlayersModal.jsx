import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import axios from "axios";
import {
  Button,
  Divider,
  Header,
  Image,
  Modal,
  Statistic,
} from "semantic-ui-react";
import foto from "../../img/matthew.png";
import PlanModal from "./PlanModal";
import EditModal from "./EditModal";
import ShowTimetable from "./ShowTimetable";
class PlayersModal extends Component {
  state = {
    open: false,
    data: this.props.players,
    currentPlayer: [],
    currentStatistics: [],
  };

  getPlayerByID = async () => {
    await axios({
      url: `http://localhost:5000/players/${this.props.id}`,
      method: "get",
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ currentPlayer: response.data });
        //  console.log("pojedynczo", this.state.currentPlayer);
      },
      (error) => {
        console.log(error);
      },
    );
  };
  getStatisticsByID = async () => {
    await axios({
      url: `http://localhost:5000/statistics/${this.state.currentPlayer.statistics_id}`,
      method: "get",
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ currentStatistics: response.data });
        //console.log("staty", this.state.currentStatistics);
      },
      (error) => {
        console.log(error);
      },
    );
  };
  myCallbackEdit = async (dataFromChild) => {
    await this.getStatisticsByID();
    if (dataFromChild === true) {
      await this.props.callbackFromParent(dataFromChild);
    }
  };
  componentDidMount = async () => {
    await this.getPlayerByID();
    await this.getStatisticsByID();
  };
  render() {
    return (
      <Modal
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        open={this.state.open}
        trigger={<Button style={{ width: "100%" }}>Zarządzaj</Button>}
      >
        <Modal.Header>
          {this.state.currentPlayer.first_name +
            " " +
            this.state.currentPlayer.last_name}
        </Modal.Header>
        <Modal.Content image>
          <Image size="medium" src={foto} wrapped />
          <Modal.Description>
            <Header style={{ textTransform: "uppercase" }}>
              {this.state.currentPlayer.position}
            </Header>
            <Statistic.Group widths="2">
              <Statistic>
                <Statistic.Value>
                  {this.state.currentStatistics.goals_season}
                </Statistic.Value>
                <Statistic.Label>Goli w sezonie</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {this.state.currentStatistics.goals_all}
                </Statistic.Value>
                <Statistic.Label>Goli w karierze</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {this.state.currentStatistics.assist_season}
                </Statistic.Value>
                <Statistic.Label>Asyst w sezonie</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {this.state.currentStatistics.assist_all}
                </Statistic.Value>

                <Statistic.Label>Asyst w karierze</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {this.state.currentStatistics.matches_season}
                </Statistic.Value>
                <Statistic.Label>Mecze w sezonie</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {this.state.currentStatistics.matches_all}
                </Statistic.Value>
                <Statistic.Label>Mecze w karierze</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {this.state.currentStatistics.weight}
                </Statistic.Value>
                <Statistic.Label>Waga</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {this.state.currentStatistics.height}
                </Statistic.Value>

                <Statistic.Label>Wzrost</Statistic.Label>
              </Statistic>
            </Statistic.Group>
            <br />
            <Divider horizontal>
              {" "}
              <EditModal
                statistics={this.state.currentStatistics}
                player={this.state.currentPlayer}
                callbackFromParent={this.myCallbackEdit}
              />
            </Divider>
            <br />
            <Divider horizontal>
              <PlanModal
                id={this.props.id}
                callbackFromParent={this.myCallbackEdit}
              />
            </Divider>
            <br />
            <Divider horizontal>
              <ShowTimetable id={this.props.id} />
            </Divider>
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
    );
  }
}

export default PlayersModal;
