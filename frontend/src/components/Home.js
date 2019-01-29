import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Orders from "./Orders";
import HomeNavbar from "./HomeNavbar";
import { Badge } from "reactstrap";
import { withAlert } from "react-alert";
import store from '../store';
import {isAuthenticated} from '../actions/authActions';
import { connect } from "react-redux";
// API Address
const HOST = "http://localhost:5500";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state ={
      
    }
  }

  componentWillMount() {
    var token = store.getState().auth.token
    this.props.isAuthenticated(token, (err, success) => {
      if(success){
        this.props.alert.success("Authentication Successfull");
      }else{
        this.props.alert.error("Authentication Failed");
        this.props.history.push('/login')
        // window.open("/login", "_self")
      }
    });
    // axios
    //   .get(HOST + "/isAuthenticated?token=" + token)
    //   .then(function(response) {
    //     console.log(response.data);
    //     if (!response.data) {
    //       self.props.alert.error("Authentication Failed");
    //       self.setState({
    //         isLoggedIn: false
    //       });
    //       window.open("/login", "_self")
    //     } else {
    //       self.props.alert.success("Authentication Successfull");
    //       self.setState({
    //         isLoggedIn: true
    //       });
    //     }
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  }

  render() {
    return (
      <div>
        <HomeNavbar />
        <h1>
          <Badge color="secondary">Open Orders</Badge>
        </h1>
        <Orders />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { isAuthenticated }
)(withAlert(Home));