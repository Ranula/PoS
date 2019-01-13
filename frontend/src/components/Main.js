import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/Login" component={Login} />
      <Route path="/Signup" component={Signup} />
      <Route path="/Home" component={Home} />
    </Switch>
  </main>
);
export default Main;