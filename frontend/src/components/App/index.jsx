import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import NavBar from "../NavBar";
import Homepage from "../Homepage";
import { Switch, BrowserRouter, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/home" component={Homepage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
