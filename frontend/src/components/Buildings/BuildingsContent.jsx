import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import { Button, Icon, Image, Item, Label } from "semantic-ui-react";
import foto from "../../img/matthew.png";
const paragraph = (
  <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
);

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
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </div>
    );
  }
}

export default BuildingsContent;
