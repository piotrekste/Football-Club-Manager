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
    selectedEvent: "",
    events: [
      {
        start: moment().toDate(),
        end: moment().add(1, "hours").toDate(),
        title: "Some title",
      },
    ],
  };
  getEventName = (e) => {
    console.log("event name", e);
    this.setState({ selectedEvent: e.id });
  };
  getEvents = async () => {
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

      // temp[i].push(moment().add(1, "hours").toDate());
      // temp[i].push(this.state.unformatedData[i].description);
    }

    await this.setState({ formatedData: temp });
    await console.log("nie wiem", this.state.formatedData);
  };
  myCallbackAdded = async (dataFromChild) => {
    await this.getEvents();
  };
  componentDidMount = async () => {
    await this.getEvents();
  };
  render() {
    return (
      <div className="container">
        <Calendar
          className="calendar-container"
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.formatedData}
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
