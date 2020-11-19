import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TodaysTasks from "./TodaysTasks";

const localizer = momentLocalizer(moment);

class TimetableContent extends Component {
  state = {
    unformatedData: [],
    formatedData: [],
    formatedAllData: [],
    unformatedGlobalsData: [],
    formatedGlobalsData: [],
    selectedEvent: "",
    currentID: localStorage.getItem("id"),
    currentPerson: localStorage.getItem("role"),
    userData: [],
    events: [
      {
        start: moment().toDate(),
        end: moment().add(1, "hours").toDate(),
        title: "Some title",
      },
    ],
  };
  getMeetingsId = async () => {
    if (this.state.currentPerson === "manager") {
      const response = await fetch(
        `http://localhost:5000/managers/${this.state.currentID}`,
        setHeaders(),
      );
      const body = await response.json();
      this.setState({ userData: body });
    }
    console.log("dane menadzera", this.state.userData);
  };
  getEventName = (e) => {
    console.log("event name", e);
    this.setState({ selectedEvent: e.id });
  };
  getEvents = async () => {
    for (var i = 0; i < this.state.userData.meeting_id.length; i++) {
      const response = await fetch(
        `http://localhost:5000/meetings/${this.state.userData.meeting_id[i]}`,
        setHeaders(),
      );
      const body = await response.json();
      await this.state.unformatedData.push(body);
    }

    var temp = [];
    for (var i = 0; i < this.state.unformatedData.length; i++) {
      temp[i] = {
        start: moment(this.state.unformatedData[i].date).toDate(),
        end: moment(this.state.unformatedData[i].date).add(1, "hours").toDate(),
        title: this.state.unformatedData[i].description,
        id: this.state.unformatedData[i]._id,
      };
    }

    await this.setState({ formatedData: temp });
    await console.log("nie wiem", this.state.formatedData);
  };

  getAllGlobals = async () => {
    const response = await fetch(
      "http://localhost:5000/globals/",
      setHeaders(),
    );
    const body = await response.json();
    this.setState({ unformatedGlobalsData: body });
    // console.log("unformatedData", this.state.unformatedData);

    var temp = [];
    for (var i = 0; i < this.state.unformatedGlobalsData.length; i++) {
      temp[i] = {
        // start: this.state.unformatedData[i].date,
        start: moment(this.state.unformatedGlobalsData[i].date).toDate(),
        end: moment(this.state.unformatedGlobalsData[i].date)
          .add(1, "hours")
          .toDate(),
        title: this.state.unformatedGlobalsData[i].description,
        id: this.state.unformatedGlobalsData[i]._id,
      };
    }

    await this.setState({ formatedGlobalsData: temp });
  };
  myCallbackAdded = async (dataFromChild) => {
    await this.getEvents();
  };
  componentDidMount = async () => {
    await this.getMeetingsId();
    await this.getEvents();
    await this.getAllGlobals();
    var temp1 = this.state.formatedData;
    var temp2 = this.state.formatedGlobalsData;
    var temp3 = temp1.concat(temp2);
    await this.setState({ formatedAllData: temp3 });
  };
  render() {
    return (
      <div className="container">
        <Calendar
          className="calendar-container"
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.formatedAllData}
          style={{ height: "85vh" }}
          onSelectEvent={this.getEventName}
        />
        <TodaysTasks
          id={this.state.selectedEvent}
          callbackFromParent={this.myCallbackAdded}
        />
      </div>
    );
  }
}

export default TimetableContent;

/**
 * 
 * 
 * getEvents = async () => {
    const response = await fetch(
      "http://localhost:5000/meetings/",
      setHeaders(),
    );
    const body = await response.json();
    this.setState({ unformatedData: body });
    // console.log("unformatedData", this.state.unformatedData);

    var temp = [];
    for (var i = 0; i < this.state.unformatedData.length; i++) {
      temp[i] = {
        // start: this.state.unformatedData[i].date,
        start: moment(this.state.unformatedData[i].date).toDate(),
        end: moment(this.state.unformatedData[i].date).add(1, "hours").toDate(),
        title: this.state.unformatedData[i].description,
        id: this.state.unformatedData[i]._id,
      };
    }

    await this.setState({ formatedData: temp });
    await console.log("nie wiem", this.state.formatedData);
  };
 */
