import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Login from "./Login";
// API Address
const HOST = "http://localhost:5500";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }
  componentWillMount() {
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}
export default Landing;