import React, { useEffect, useContext } from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Homepage from "../Homepage";
import Login from "../Login";
import Buildings from "../Buildings";
import Players from "../Players";
import Timetable from "../Timetable";
import Staffs from "../Staffs";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Store from "../../Store";
const App = () => {
  const { isLogged, changeStore } = useContext(Store);

  useEffect(() => {
    if (!isLogged) return;

    if (localStorage.getItem("role") === "manager") {
      changeStore("manager", true);
    } else {
      changeStore("manager", false);
    }
  }, [changeStore, isLogged]);

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/buildings" component={Buildings} />
        <Route exact path="/players" component={Players} />
        <Route exact path="/timetable" component={Timetable} />
        <Route exact path="/staffs" component={Staffs} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
