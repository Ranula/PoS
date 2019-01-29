import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
const Main = () => (
  <main>
    <Switch>
      <Redirect exact path="/" to="/Login" />
      <Route path="/Login" component={Login} />
      <Route path="/Signup" component={Signup} />
      <Route path="/Home" component={Home} />
      <Route component={Landing} />
    </Switch>
  </main>
);
export default Main;