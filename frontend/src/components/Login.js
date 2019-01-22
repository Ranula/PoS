import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import Header from "./Header";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";

// API Address
const HOST = "http://localhost:5500";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    var values = event.target.elements;
    let uName = values.usermail.value;
    let uPassword = values.userpassword.value;

    axios
      .post(HOST + "/login", {
        username: uName,
        password: uPassword
      })
      .then(function(response) {
        console.log(response);
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          window.alert("Login successful");
          window.open("/Home", "_self");
        } else {
          window.alert("Login Failed");
        }
      })
      .catch(function(error) {
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
            <MDBCol md="3" />
            <MDBCol md="6">
              <form onSubmit={this.handleSubmit}>
                <p className="h5 text-center mb-4">Sign In</p>
                <div className="grey-text">
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
                    name="userpassword"
                    label="Type your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                </div>
                <div className="text-center">
                  <MDBBtn type="submit" color="primary">
                    Sign In
                  </MDBBtn>
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
export default Login;
