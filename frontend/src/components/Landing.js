import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Login from "./Login";
// API Address
const HOST = "http://localhost:5500";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      login: false,
      signup: false 
    };
  }
  componentDidMount() {
  }

  render() {
    
      return (
        <div>
          <Login></Login>
        </div>
      );
    

  }
}
export default Landing;