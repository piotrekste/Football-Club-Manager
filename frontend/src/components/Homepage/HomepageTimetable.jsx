import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

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
  };
  getMeetingsId = async () => {
    const response = await fetch(
      `http://localhost:5000/managers/${this.state.currentID}`,
      setHeaders(),
    );
    const body = await response.json();
    this.setState({ userData: body });
  };
  getPlayerMeetingId = async () => {
    const response = await fetch(
      `http://localhost:5000/players/${this.state.currentID}`,
      setHeaders(),
    );
    const body = await response.json();
    this.setState({ userData: body });
  };
  getStaffMeetingId = async () => {
    const response = await fetch(
      `http://localhost:5000/staffs/${this.state.currentID}`,
      setHeaders(),
    );
    const body = await response.json();
    this.setState({ userData: body });
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
    for (i = 0; i < this.state.unformatedData.length; i++) {
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
  componentDidMount = async () => {
    if (this.state.currentPerson === "manager") {
      await this.getMeetingsId();
    }

    if (this.state.currentPerson === "player") {
      await this.getPlayerMeetingId();
    }
    if (this.state.currentPerson === "staff") {
      await this.getStaffMeetingId();
    }
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
          className="homepage-calendar-container"
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.formatedAllData}
          style={{ height: "60vh" }}
          onSelectEvent={this.getEventName}
        />
      </div>
    );
  }
}

export default TimetableContent;
