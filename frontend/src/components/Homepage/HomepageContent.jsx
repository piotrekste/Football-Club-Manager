import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";

import HomepageTimetable from "./HomepageTimetable";
import HomepageAddMessage from "./HomepageAddMessage";
import HomepageMessages from "./HomepageMessages";
import { Statistic, Segment } from "semantic-ui-react";
import Store from "../../Store";
class HomepageContent extends Component {
  state = {
    sumSalary: 0,
    allContracts: [],
    sumIncome: 0,
    allBuildings: [],
    buildingsCosts: 0,
    first_name: "",
    last_name: "",
    reload: false,
    staffUser: [],
  };
  static contextType = Store;
  getSalary = async () => {
    const response = await fetch(
      "http://localhost:5000/contracts/",
      setHeaders(),
    );
    const body = await response.json();
    this.setState({ allContracts: body });
    // console.log("unformatedData", this.state.unformatedData);

    var temp = 0;

    for (var i = 0; i < this.state.allContracts.length; i++) {
      temp += parseInt(this.state.allContracts[i].salary);
    }
    await this.setState({ sumSalary: temp });

    //await console.log("nie wiem", this.state.formatedData);
  };
  getStaffData = async () => {
    const response = await fetch(
      `http://localhost:5000/staffs/${localStorage.getItem("id")}`,
      setHeaders(),
    );
    const body = await response.json();
    await this.setState({ staffUser: body });
    console.log("staffuser", this.state.staffUser);
    await this.setState({
      first_name: this.state.staffUser.first_name,
      last_name: this.state.staffUser.last_name,
    });

    await localStorage.setItem("first_name", this.state.first_name);
    await localStorage.setItem("last_name", this.state.last_name);
  };
  getIncome = async () => {
    const response = await fetch(
      "http://localhost:5000/building/",
      setHeaders(),
    );
    const body = await response.json();
    this.setState({ allBuildings: body });
    // console.log("unformatedData", this.state.unformatedData);

    var temp = 0;
    var temp2 = 0;
    for (var i = 0; i < this.state.allBuildings.length; i++) {
      temp += this.state.allBuildings[i].income;
      temp2 += this.state.allBuildings[i].costs;
    }
    await this.setState({ sumIncome: temp, buildingsCosts: temp2 });

    //await console.log("nie wiem", this.state.formatedData);
  };
  componentDidMount = async () => {
    await this.setState({ first_name: localStorage.getItem("first_name") });
    await this.setState({ last_name: localStorage.getItem("last_name") });
    if (this.state.first_name === "undefined") {
      await this.getStaffData();
    }
    await this.getSalary();
    await this.getIncome();
  };
  myCallbackAddMessage = async (dataFromChild) => {
    if (dataFromChild === true) {
      await this.setState({ reload: dataFromChild });
    }
  };
  render() {
    return (
      <div className="container">
        {" "}
        <div className="homepage-entry-container">
          <Segment style={{ fontSize: ".7em" }}>
            Dzień dobry,
            {" " + this.state.first_name} {" " + this.state.last_name}!
          </Segment>
        </div>
        {!this.context.role && (
          <div className="homepage-add-message-container">
            <Segment style={{ overflow: "auto", minHeight: "30vh" }}>
              <Segment style={{ fontSize: "1.2em" }}>
                Chcesz wysłać nową wiadomość do pozostałych członków klubu?
              </Segment>
              <HomepageAddMessage
                callbackFromParent={this.myCallbackAddMessage}
              />
            </Segment>
          </div>
        )}
        {this.context.role && (
          <div className="homepage-statistics-container">
            <Segment style={{ overflow: "auto", maxHeight: "65vh" }}>
              <Segment style={{ fontSize: "1.2em" }}>
                Aktualne statystyki:
              </Segment>
              <Statistic.Group widths="1">
                <Statistic>
                  <Statistic.Value>
                    {this.state.buildingsCosts + " PLN"}
                  </Statistic.Value>
                  <Statistic.Label>
                    wydatki na utrzymanie budynkow
                  </Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>
                    {this.state.sumSalary + " PLN"}
                  </Statistic.Value>
                  <Statistic.Label>wydatki na pensje</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>
                    {this.state.sumIncome + " PLN"}
                  </Statistic.Value>
                  <Statistic.Label>zarobki z dnia meczowego</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>
                    {this.state.sumIncome -
                      this.state.sumSalary -
                      this.state.buildingsCosts +
                      " PLN"}
                  </Statistic.Value>
                  <Statistic.Label>miesięczny bilans</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Segment>{" "}
          </div>
        )}
        <div className="homepage-messages-container">
          <HomepageMessages flag={this.state.reload} />
        </div>
        <HomepageTimetable />
      </div>
    );
  }
}

export default HomepageContent;

//{this.context.role && " menadzeru!! "}
