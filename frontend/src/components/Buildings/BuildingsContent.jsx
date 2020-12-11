import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import { Item, Label, Segment } from "semantic-ui-react";
import BuildingsManage from "./BuildingsManage";

class BuildingsContent extends Component {
  state = {
    buildings: [],
  };
  getAllBuildings = async () => {
    const response = await fetch(
      "http://localhost:5000/building/",
      setHeaders(),
    );
    const body = await response.json();
    this.setState({ buildings: body });
    console.log("data", this.state.buildings);
  };
  myCallback = async (dataFromChild) => {
    await this.getAllBuildings();
  };
  componentDidMount = async () => {
    await this.getAllBuildings();
  };
  render() {
    return (
      <div className="container">
        <Item.Group divided>
          {this.state.buildings.map((value, key) => (
            <Item key={key}>
              <Item.Image
                size="medium"
                src="https://react.semantic-ui.com/images/wireframe/image.png"
              />

              <Item.Content>
                <Item.Header className="building-header">
                  {value.name}
                </Item.Header>

                <Item.Description>{value.description}</Item.Description>
                <Item.Extra className="building-extra">
                  <Label>Pojemność: {value.capacity}</Label> <br />
                  <Label>Miesięczny koszt utrzymania: {value.costs}</Label>
                  <br />
                  <Label>Miesięczny dochód: {value.income}</Label>
                </Item.Extra>
                <br />
                <BuildingsManage
                  id={this.state.buildings[key]._id}
                  callbackFromParent={this.myCallback}
                />
              </Item.Content>
            </Item>
          ))}{" "}
          <Segment />
        </Item.Group>
      </div>
    );
  }
}

export default BuildingsContent;
