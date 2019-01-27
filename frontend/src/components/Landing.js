import React, { Component } from "react";
import "./App.css";
import Login from "./Login";

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