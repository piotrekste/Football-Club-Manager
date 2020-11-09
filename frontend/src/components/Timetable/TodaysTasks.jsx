import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import axios from "axios";
import AddTask from "./AddTask";
class TodaysTasks extends Component {
  state = {
    currentTask: [],
  };
  getMeetingByID = async () => {
    await axios({
      url: `http://localhost:5000/meetings/${this.props.id}`,
      method: "get",
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ currentTask: response.data });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.id !== this.props.id) {
      await this.getMeetingByID();
    }
  };
  render() {
    return (
      <div className="extras-container">
        <br />
        {this.props.id}
        {this.state.currentTask.description}
        <br /> <br />
        {this.state.currentTask.city}
        <br /> <br />
        {this.state.currentTask.street}
        <br /> <br />
        {this.state.currentTask.date}
        <br />
        <br /> <br />
        <br /> <br /> <br /> <br /> <br />
        <br /> <br /> <br /> <br />
        <AddTask />
      </div>
    );
  }
}

export default TodaysTasks;

/**
 *    <Segment>
            <Divider horizontal></Divider>

            <Button
              color="teal"
              content="EDYTUJ"
              icon="add"
              labelPosition="left"
            />
            <Divider horizontal></Divider>
            <Button
              color="teal"
              content="ZAPLANUJ"
              icon="add"
              labelPosition="left"
            />
          </Segment>
 */
