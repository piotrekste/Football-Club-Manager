import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";

import { Card, Segment } from "semantic-ui-react";
import foto from "../../img/patrick.png";

class HomepageMessages extends Component {
  state = {
    messages: [],
    reload: this.props.flag,
  };
  getAllMessages = async () => {
    const response = await fetch(
      "http://localhost:5000/messages/",
      setHeaders(),
    );
    const body = await response.json();
    this.setState({ messages: body.reverse() });
    console.log("data", this.state.messages);
  };
  componentDidMount = async () => {
    await this.getAllMessages();
  };
  componentDidUpdate = async (prevProps, prevState) => {
    await this.getAllMessages();
  };
  render() {
    return (
      <div className="messages-container">
        <Segment style={{ overflow: "auto", maxHeight: "63vh" }}>
          <Segment style={{ fontSize: "1.2em" }}>Najnowsze wiadomości:</Segment>
          <Card.Group itemsPerRow={1}>
            {this.state.messages.map((value, key) => (
              <Card
                key={key}
                className="homepage-card"
                header={value.title}
                description={value.description}
                meta={value.owner}
                extra={value.date.slice(0, 10) + " " + value.date.slice(11, 16)}
              />
            ))}
          </Card.Group>
        </Segment>
      </div>
    );
  }
}

export default HomepageMessages;
/*
 */
