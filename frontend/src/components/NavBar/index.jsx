import React, { Component, useContext } from "react";
import setHeaders from "../../utils/setHeaders";
import "./NavBar.css";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import { Menu, Image } from "semantic-ui-react";

import Store from "../../Store";
class NavBar extends Component {
  state = {
    data: [],
    activeItem: "",
    role: "",
    isLogged: false,
  };
  static contextType = Store;

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogout = () => {
    localStorage.clear();
    this.context.changeStore("isLogged", false);
    this.context.changeStore("role", null);

    document.location.href = "/login";
  };
  render() {
    return (
      <>
        {!this.context.isLogged && (
          <div className="menubar">
            <Menu stackable secondary size="large">
              <Image
                src={logo}
                className="navbar-logo"
                as={Link}
                to="/"
                style={{ width: "200px", height: "50px" }}
              />

              <Menu.Menu position="right">
                <Menu.Item
                  name="Login"
                  as={Link}
                  to="/login"
                  active={this.state.activeItem === "Login"}
                  //onClick={this.handleLogout}
                />
              </Menu.Menu>
            </Menu>
          </div>
        )}
        {this.context.isLogged && this.context.role && (
          <div className="menubar">
            <Menu stackable secondary size="large">
              <Image
                src={logo}
                className="navbar-logo"
                as={Link}
                to="/"
                style={{ width: "200px", height: "50px" }}
              />

              <Menu.Item
                as={Link}
                to="/timetable"
                name="timetable"
                active={this.state.activeItem === "timetable"}
                onClick={this.handleItemClick}
                className="menuitem"
              />
              <Menu.Item
                as={Link}
                to="/players"
                name="players"
                active={this.state.activeItem === "players"}
                onClick={this.handleItemClick}
                className="menuitem"
              />
              <Menu.Item
                as={Link}
                to="/staffs"
                name="staff"
                active={this.state.activeItem === "staff"}
                onClick={this.handleItemClick}
                className="menuitem"
              />
              <Menu.Item
                as={Link}
                to="/buildings"
                name="buildings"
                active={this.state.activeItem === "buildings"}
                onClick={this.handleItemClick}
                className="menuitem"
              />

              <Menu.Menu position="right">
                <Menu.Item
                  name="Logout"
                  active={this.state.activeItem === "Logout"}
                  onClick={this.handleLogout}
                />
              </Menu.Menu>
            </Menu>
          </div>
        )}

        {this.context.isLogged && !this.context.role && (
          <div className="menubar">
            <Menu stackable secondary size="large">
              <Image
                src={logo}
                className="navbar-logo"
                as={Link}
                to="/"
                style={{ width: "200px", height: "50px" }}
              />

              <Menu.Item
                as={Link}
                to="/timetable"
                name="timetable"
                active={this.state.activeItem === "timetable"}
                onClick={this.handleItemClick}
                className="menuitem"
              />

              <Menu.Menu position="right">
                <Menu.Item
                  name="Logout"
                  active={this.state.activeItem === "Logout"}
                  onClick={this.handleLogout}
                />
              </Menu.Menu>
            </Menu>
          </div>
        )}
      </>
    );
  }
}

export default NavBar;

/**
 * 
 * 
 * 
  <div className="menubar">
        <Menu stackable secondary size="large">
          <Image
            src={logo}
            className="navbar-logo"
            as={Link}
            to="/"
            style={{ width: "200px", height: "50px" }}
          />
  
          <Menu.Item
            as={Link}
            to="/timetable"
            name="timetable"
            active={this.state.activeItem === "timetable"}
            onClick={this.handleItemClick}
            className="menuitem"
          />
          <Menu.Item
            as={Link}
            to="/players"
            name="players"
            active={this.state.activeItem === "players"}
            onClick={this.handleItemClick}
            className="menuitem"
          />
          <Menu.Item
            as={Link}
            to="/staffs"
            name="staff"
            active={this.state.activeItem === "staff"}
            onClick={this.handleItemClick}
            className="menuitem"
          />
          <Menu.Item
            as={Link}
            to="/buildings"
            name="buildings"
            active={this.state.activeItem === "buildings"}
            onClick={this.handleItemClick}
            className="menuitem"
          />
        
          <Menu.Menu position="right">
            <Menu.Item
              name="Logout"
              active={this.state.activeItem === "Logout"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
 */

/**
 * 
 * import React, { Component, useContext } from "react";
import setHeaders from "../../utils/setHeaders";
import "./NavBar.css";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import { Menu, Image } from "semantic-ui-react";

import Store from "../../Store";
class NavBar extends Component {
  state = {
    data: [],
    activeItem: "",
    role: "",
    isLogged: false,
  };

  componentDidMount = async () => {
    await this.setState({
      role: localStorage.getItem("role"),
      isLogged: localStorage.getItem("isLogged"),
    });
  };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { isLogged, changeStore, hasPlant } = useContext(Store);
    return (
      <>
        {!isLogged && (
          <div className="menubar">
            <Menu stackable secondary size="large">
              <Image
                src={logo}
                className="navbar-logo"
                as={Link}
                to="/"
                style={{ width: "200px", height: "50px" }}
              />

              <Menu.Menu position="right">
                <Menu.Item
                  name="Logout"
                  active={this.state.activeItem === "Logout"}
                  onClick={this.handleItemClick}
                />
              </Menu.Menu>
            </Menu>
          </div>
        )}

        {isLogged &&
          this.state.role !==
            "manager"(
              <div className="menubar">
                <Menu stackable secondary size="large">
                  <Image
                    src={logo}
                    className="navbar-logo"
                    as={Link}
                    to="/"
                    style={{ width: "200px", height: "50px" }}
                  />

                  <Menu.Item
                    as={Link}
                    to="/timetable"
                    name="timetable"
                    active={this.state.activeItem === "timetable"}
                    onClick={this.handleItemClick}
                    className="menuitem"
                  />

                  <Menu.Menu position="right">
                    <Menu.Item
                      name="Logout"
                      active={this.state.activeItem === "Logout"}
                      onClick={this.handleItemClick}
                    />
                  </Menu.Menu>
                </Menu>
              </div>,
            )}

        {isLogged &&
          this.state.role ===
            "manager"(
              <div className="menubar">
                <Menu stackable secondary size="large">
                  <Image
                    src={logo}
                    className="navbar-logo"
                    as={Link}
                    to="/"
                    style={{ width: "200px", height: "50px" }}
                  />

                  <Menu.Item
                    as={Link}
                    to="/timetable"
                    name="timetable"
                    active={this.state.activeItem === "timetable"}
                    onClick={this.handleItemClick}
                    className="menuitem"
                  />
                  <Menu.Item
                    as={Link}
                    to="/players"
                    name="players"
                    active={this.state.activeItem === "players"}
                    onClick={this.handleItemClick}
                    className="menuitem"
                  />
                  <Menu.Item
                    as={Link}
                    to="/staffs"
                    name="staff"
                    active={this.state.activeItem === "staff"}
                    onClick={this.handleItemClick}
                    className="menuitem"
                  />
                  <Menu.Item
                    as={Link}
                    to="/buildings"
                    name="buildings"
                    active={this.state.activeItem === "buildings"}
                    onClick={this.handleItemClick}
                    className="menuitem"
                  />

                  <Menu.Menu position="right">
                    <Menu.Item
                      name="Logout"
                      active={this.state.activeItem === "Logout"}
                      onClick={this.handleItemClick}
                    />
                  </Menu.Menu>
                </Menu>
              </div>,
            )}
      </>
    );
  }
}

export default NavBar;
 */
