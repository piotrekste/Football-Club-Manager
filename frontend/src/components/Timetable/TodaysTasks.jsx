import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import axios from "axios";
import AddTask from "./AddTask";
import AddMyTask from "./AddMyTask";
import { Divider, List } from "semantic-ui-react";
import Store from "../../Store";

class TodaysTasks extends Component {
  state = {
    currentTask: [],
  };
  static contextType = Store;
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
        axios({
          url: `http://localhost:5000/matches/${this.props.id}`,
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
      },
    );
  };
  myCallbackAddTask = async (dataFromChild) => {
    await this.props.callbackFromParent(dataFromChild);
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.id !== this.props.id) {
      await this.getMeetingByID();
    }
  };

  render() {
    return (
      <div className="extras-container">
        <div className="todays-task-container">
          <p>Aby wyświetlic szczegóły - wybierz zadanie z kalendarza!</p>
        </div>
        <Divider />
        <div className="selected-task-container">
          <List>
            <List.Item> {this.state.currentTask.description}</List.Item>
            <List.Item>{this.state.currentTask.city}</List.Item>
            <List.Item> {this.state.currentTask.street}</List.Item>
            <List.Item> {this.state.currentTask.title}</List.Item>
            <List.Item> {this.state.currentTask.date}</List.Item>
          </List>
        </div>

        <Divider />

        <div className="addtask-container">
          {this.context.role && (
            <>
              <AddTask callbackFromParent={this.myCallbackAddTask} />
              <AddMyTask callbackFromParent={this.myCallbackAddTask} />
            </>
          )}
        </div>
      </div>
    );
  }
}

export default TodaysTasks;

/**
 *  <div className="map-container">
          {" "}
         
          <ReactMapGL
            className="task-map"
            {...this.state.viewport}
            onViewportChange={(viewport) => this.setState({ viewport })}
          ></ReactMapGL>
        </div>
 */
