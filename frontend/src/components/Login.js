import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import Header from "./Header";
import {logIn} from '../actions/authActions'
import { connect } from "react-redux";
import { withAlert } from 'react-alert'
import { FaSignInAlt } from 'react-icons/fa';


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
    event.preventDefault();
    var values = event.target.elements;
    let uName = values.usermail.value;
    let uPassword = values.userpassword.value;
    let user = {
      username: uName,
      password: uPassword
    }
    this.props.logIn(user).then(token =>{
      localStorage.setItem('token',JSON.stringify(token))
      this.props.history.push('/Home')
    }).catch(error =>{
      this.props.alert.error("Login Failed")
    })
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
                    Sign In {" "}
                    <FaSignInAlt></FaSignInAlt>
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logIn }
)(withAlert(Login));

