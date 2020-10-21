import React, { Component } from "react";
import setHeaders from "../../utils/setHeaders";
import "./NavBar.css";

import { Link } from "react-router-dom";
import { Input, Menu } from "semantic-ui-react";
class NavBar extends Component {
  state = {
    data: [],
    activeItem: "home",
  };
  getData = async () => {
    const response = await fetch("http://localhost:5000/user/", setHeaders());
    const body = await response.json();
    this.setState({ data: body });
    console.log("data", this.state.data);
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <div className="menubar">
        <Menu secondary size="large">
          <Menu.Item
            as={Link}
            to="/home"
            name="home"
            className="menuitem"
            active={this.state.activeItem === "home"}
            onClick={this.handleItemClick}
          ></Menu.Item>

          <Menu.Item
            as={Link}
            to="/"
            name="back"
            active={this.state.activeItem === "back"}
            onClick={this.handleItemClick}
            className="menuitem"
          />
          <Menu.Item
            as={Link}
            to="/"
            name="players"
            active={this.state.activeItem === "players"}
            onClick={this.handleItemClick}
            className="menuitem"
          />
          <Menu.Item
            as={Link}
            to="/"
            name="buildings"
            active={this.state.activeItem === "buildings"}
            onClick={this.handleItemClick}
            className="menuitem"
          />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            <Menu.Item
              name="logout"
              active={this.state.activeItem === "logout"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default NavBar;

/**
 <div>
        <AppBar position="fixed" color="transparent">
          <Toolbar variant="regular" className="toolbar">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>

            <ButtonGroup
              size="large"
              color="inherit"
              aria-label="large outlined primary button group"
              className="group-button"
            >
              <Button onClick={this.buttonHandle}>One</Button>
              <Button>
                <Link to="/home">hołm</Link>
              </Button>
              <Button>
                {" "}
                <Link to="/">back</Link>
              </Button>
            </ButtonGroup>
          </Toolbar>
        </AppBar>
      </div>
 */

/*

  <Sidebar.Pushable as={Segment} className="sidebarCustom">
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          vertical
          visible
          width="thin"
        >
          <Menu.Item as="a">
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="gamepad" />
            Games
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="camera" />
            Channels
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>
            <Header as="h3">Application Content</Header>
            <Image src="/images/wireframe/paragraph.png" />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>*/
