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
    unformatedMatchesData: [],
    formatedMatchesData: [],
    selectedEvent: "",
    currentID: localStorage.getItem("id"),
    currentPerson: localStorage.getItem("role"),
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

  getAllMatches = async () => {
    const response = await fetch(
      "http://localhost:5000/matches/",
      setHeaders(),
    );
    const body = await response.json();
    this.setState({ unformatedMatchesData: body });
    // console.log("unformatedData", this.state.unformatedData);

    var temp = [];
    for (var i = 0; i < this.state.unformatedMatchesData.length; i++) {
      temp[i] = {
        // start: this.state.unformatedData[i].date,
        start: moment(this.state.unformatedMatchesData[i].date).toDate(),
        end: moment(this.state.unformatedMatchesData[i].date)
          .add(1, "hours")
          .toDate(),
        title: this.state.unformatedMatchesData[i].description,
        id: this.state.unformatedMatchesData[i]._id,
      };
    }

    await this.setState({ formatedMatchesData: temp });
  };
  componentDidMount = async () => {
    await this.getMeetingsId();
    await this.getEvents();
    await this.getAllMatches();

    var temp1 = this.state.formatedData;
    var temp2 = this.state.formatedMatchesData;
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
