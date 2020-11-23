import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import axios from "axios";
import AddTask from "./AddTask";
import AddMyTask from "./AddMyTask";
import AddMessage from "./AddMessage";
import { Divider, List } from "semantic-ui-react";
import Store from "../../Store";

class TodaysTasks extends Component {
  state = {
    currentTask: [],
    flag: false,
  };
  static contextType = Store;
  getMeetingByID = async () => {
    await axios({
      url: `http://localhost:5000/meetings/${this.props.id}`,
      method: "get",
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ currentTask: response.data, flag: false });
        var temp = this.state.currentTask;
        temp.date = temp.date.slice(0, 10);
        this.setState({ currentTask: temp });
      },
      (error) => {
        this.setState({ flag: true });
        console.log(error);
      },
    );

    if (this.state.flag) {
      await axios({
        url: `http://localhost:5000/globals/${this.props.id}`,
        method: "get",
        headers: setHeaders(),
      }).then(
        (response) => {
          this.setState({ currentTask: response.data, flag: false });
          var temp = this.state.currentTask;
          temp.date = temp.date.slice(0, 10);
          this.setState({ currentTask: temp });
        },
        (error) => {
          console.log(error);
        },
      );
    }
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
            <List.Item>{this.state.currentTask.place}</List.Item>
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
              <p></p>
              <AddMyTask callbackFromParent={this.myCallbackAddTask} />
              <p></p>
              <AddMessage />
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
