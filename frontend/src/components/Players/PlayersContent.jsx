import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import PlayersModal from "./PlayersModal";
import { Card, Segment } from "semantic-ui-react";
import foto from "../../img/face.png";
import AddNewPlayer from "./AddNewPlayer";
class PlayersContent extends Component {
  state = {
    players: [],
  };
  getAllPlayers = async () => {
    const response = await fetch(
      "http://localhost:5000/players/",
      setHeaders(),
    );
    const body = await response.json();
    this.setState({ players: body });
    console.log("data", this.state.players);
  };
  myCallbackEdit = async () => {
    await this.getAllPlayers();
  };
  componentDidMount = async () => {
    await this.getAllPlayers();
  };
  render() {
    return (
      <div className="container">
        <Segment style={{ textAlign: "center", marginBottom: "2em" }}>
          <AddNewPlayer callbackFromParent={this.myCallbackEdit} />
        </Segment>
        <Card.Group itemsPerRow={4}>
          {this.state.players.map((value, key) => (
            <Card
              key={key}
              className="players-card"
              image={foto}
              header={value.first_name + " " + value.last_name}
              meta={value.position.toUpperCase()}
              extra={
                <PlayersModal
                  players={this.state.players}
                  id={this.state.players[key]._id}
                  callbackFromParent={this.myCallbackEdit}
                />
              }
            />
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default PlayersContent;

//moze dodac przycisk rejestracji nowego zawodnika
