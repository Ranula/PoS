
import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import Header from "./Header";
import axios from 'axios';

// API Address
const HOST = "http://localhost:5500";

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    var values = event.target.elements
    console.log(values)
    let uEmail = values.usermail.value
    let uName = values.name.value
    let uPassword = values.userpassword.value

    axios.post(HOST + '/signup', {
      username: uName,
      usermail: uEmail,
      password: uPassword
    })
      .then(function (response) {
        console.log(response);
        if (response.data.ok) {
          window.alert("Login to continue");
          window.open("/login", "_self")
        } else {
          window.alert("Signup Failed");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    event.preventDefault();
  }


  render() {
    return (
      <div>
        <Header />
        <MDBContainer>
          <MDBRow>
          <MDBCol md="3"></MDBCol>
            <MDBCol md="6">
              <form
                onSubmit={this.handleSubmit}
              >
                <p className="h5 text-center mb-4">Sign Up</p>
                <div className="grey-text">
                  <MDBInput
                    name="name"
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    name="usermail"
                    label="Type your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Confirm your email"
                    icon="exclamation-triangle"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    name="userpassword"
                    label="Type your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />

                </div>
                <div className="text-center">
                  <MDBBtn type="submit" color="primary">Sign Up</MDBBtn>
                  {/* <input type="submit" value="Submit" /> */}
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

      </div>
    );
  }

}
export default Signup;
