import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import axios from "axios";
import HomepageTimetable from "./HomepageTimetable";
import { Statistic } from "semantic-ui-react";
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
    await this.getSalary();
    await this.getIncome();
  };
  render() {
    return (
      <div className="container">
        {" "}
        <div className="homepage-entry-container">
          Witaj {this.context.role && " menadzeru!! "}
          {this.state.first_name} {this.state.last_name}
        </div>
        <div className="homepage-statistics-container">
          <Statistic.Group widths="1">
            <Statistic>
              <Statistic.Value>{this.state.buildingsCosts}</Statistic.Value>
              <Statistic.Label>wydatki na utrzymanie budynkow</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{this.state.sumSalary}</Statistic.Value>
              <Statistic.Label>wydatki na pensje</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{this.state.sumIncome}</Statistic.Value>
              <Statistic.Label>zarobki z dnia meczowego</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>
                {this.state.sumIncome -
                  this.state.sumSalary -
                  this.state.buildingsCosts}
              </Statistic.Value>
              <Statistic.Label>miesięczny bilans</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </div>{" "}
        <HomepageTimetable />
      </div>
    );
  }
}

export default HomepageContent;
