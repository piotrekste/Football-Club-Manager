import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import StaffModal from "./StaffModal";
import { Card } from "semantic-ui-react";
import foto from "../../img/patrick.png";
class StaffsContent extends Component {
  state = {
    staffs: [],
  };
  getAllStaffs = async () => {
    const response = await fetch("http://localhost:5000/staffs/", setHeaders());
    const body = await response.json();
    this.setState({ staffs: body });
    console.log("data", this.state.staffs);
  };
  componentDidMount = async () => {
    await this.getAllStaffs();
  };
  render() {
    return (
      <div className="container">
        {" "}
        <Card.Group itemsPerRow={4}>
          {this.state.staffs.map((value, key) => (
            <Card
              key={key}
              className="staffs-card"
              image={foto}
              header={value.first_name + " " + value.last_name}
              meta={value.role.toUpperCase()}
              //extra={<PlayersModal players={this.state.players} />}
              //tutaj zaplanuj
              extra={
                <StaffModal
                  id={this.state.staffs[key]._id}
                  // callbackFromParent={this.myCallbackEdit}
                />
              }
            />
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default StaffsContent;
