import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import axios from "axios";
import AddTask from "./AddTask";
import { Divider, List } from "semantic-ui-react";

import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl";

class TodaysTasks extends Component {
  state = {
    currentTask: [],

    viewport: {
      width: 400,
      mapboxApiAccessToken:
        "pk.eyJ1IjoicGlvdHJla3N0ZTk4IiwiYSI6ImNraGRvNW01ejAwMGcyeWx1emloYWE1M24ifQ.81Bk2we1FuNo3BlVeLQ0IQ",
      height: 300,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 15,
    },
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
  myCallbackAddTask = async (dataFromChild) => {
    await this.props.callbackFromParent(dataFromChild);
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.id !== this.props.id) {
      await this.getMeetingByID();
    }
  };

  componentDidMount = async () => {
    //await this.getGeocode();
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
            <List.Item> {this.state.currentTask.date}</List.Item>
          </List>
        </div>

        <Divider />

        <div className="addtask-container">
          {" "}
          <AddTask callbackFromParent={this.myCallbackAddTask} />
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
