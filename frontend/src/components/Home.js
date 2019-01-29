import React, { Component } from "react";
import "./App.css";
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
    if(!token){
      token = JSON.parse(localStorage.getItem('token')).payload.token
    }
    console.log("Did Mount", token)
    this.props.isAuthenticated(token).then(success=>{
      if(success.payload){
        this.props.alert.success("Authentication Successfull");
      }else{
        this.props.alert.error("Authentication Failed");
        this.props.history.push('/login')
      }
    }).catch(error => {
      this.props.alert.error("Authentication Failed");
        this.props.history.push('/login')
    })
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