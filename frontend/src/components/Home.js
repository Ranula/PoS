import React, { Component } from "react";
import "./App.css";
import axios from 'axios';
import Orders from './Orders'
import HomeNavbar from './HomeNavbar'
import {Badge} from 'reactstrap'
import { withAlert } from 'react-alert'
// API Address
const HOST = "http://localhost:5500";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        isLoggedIn: '',
        products: []
     }; 
  }

  componentWillMount() {
    var token = localStorage.getItem('token')
    var self = this
    axios.get(HOST + '/isAuthenticated?token='+token)
    .then(function (response) {
        console.log(response.data)
        if(!response.data){
            self.setState({
                isLoggedIn:false,
          })
          self.props.alert.error("Authentication Failed")
          window.open("/login", "_self")
        }else{
            self.props.alert.success("Authentication Successfull")
            self.setState({
                isLoggedIn:true,
          })
        }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <HomeNavbar />
        <h1><Badge color="secondary">Open Orders</Badge></h1>
        <Orders></Orders>
      </div>
    );
  }
}
export default withAlert( Home);