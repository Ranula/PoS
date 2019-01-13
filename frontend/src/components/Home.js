import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import axios from 'axios';
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
  //Checkkkkk
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
          window.open("/login", "_self")
        }else{
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
        <h1>PoS goes here</h1>
      </div>
    );
  }
}
export default Home;