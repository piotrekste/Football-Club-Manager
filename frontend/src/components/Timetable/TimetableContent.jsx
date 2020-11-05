import React, { Component } from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TodaysTasks from "./TodaysTasks";
const localizer = momentLocalizer(moment);

class TimetableContent extends Component {
  state = {
    events: [
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Some title",
      },
    ],
  };
  render() {
    return (
      <div className="container">
        <Calendar
          className="calendar-container"
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "85vh" }}
        />
        <TodaysTasks />
      </div>
    );
  }
}

export default TimetableContent;
