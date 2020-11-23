import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import { Button, Modal, Segment, Divider } from "semantic-ui-react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
const localizer = momentLocalizer(moment);
class ShowTimetable extends Component {
  state = {
    open: false,
    startDate: new Date(),
    place: "",
    description: "",
    id: this.props.id,
    unformatedData: [],
    formatedData: [],
    formatedAllData: [],
    unformatedGlobalsData: [],
    formatedGlobalsData: [],
    selectedEventTitle: "---",
  };
  getMeetingsId = async () => {
    const response = await fetch(
      `http://localhost:5000/staffs/${this.state.id}`,
      setHeaders(),
    );
    const body = await response.json();
    await this.setState({ userData: body });
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
    await this.getMeetingsId();

    await this.getAllGlobals();
    await this.getEvents();
    var temp1 = this.state.formatedData;
    var temp2 = this.state.formatedGlobalsData;
    var temp3 = temp1.concat(temp2);
    await this.setState({ formatedAllData: temp3 });
  };

  getEventName = (e) => {
    this.setState({ selectedEventTitle: e.title });
  };
  render() {
    return (
      <>
        <Modal
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          open={this.state.open}
          trigger={<Button style={{ width: "100%" }}>Pokaż harmonogram</Button>}
        >
          <Modal.Header>Harmonogram</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Calendar
                className="homepage-calendar-container"
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={this.state.formatedAllData}
                style={{ height: "70vh", width: "100%" }}
                onSelectEvent={this.getEventName}
              />
            </Modal.Description>
          </Modal.Content>

          <div className="staff-timetable-info">
            {this.state.selectedEventTitle}
          </div>

          <Modal.Actions>
            <Button
              content="Zamknij"
              labelPosition="right"
              icon="checkmark"
              onClick={() => this.setState({ open: false })}
              positive
            />
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default ShowTimetable;
