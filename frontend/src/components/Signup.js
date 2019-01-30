import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import Header from "./Header";
import { FaSignInAlt } from "react-icons/fa";
import { signUp } from "../actions/authActions";
import { connect } from "react-redux";
import { withAlert } from "react-alert";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    var values = event.target.elements;
    console.log(values);
    let uEmail = values.usermail.value;
    let uName = values.name.value;
    let uPassword = values.userpassword.value;
    let user = {
      username: uName,
      usermail: uEmail,
      password: uPassword
    };
    this.props
      .signUp(user)
      .then(success => {
        this.props.alert.success("Login to continue");
        this.props.history.push("/Login");
      })
      .catch(error => {
        this.props.alert.error("Sign Up Failed");
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
                  <MDBBtn type="submit" color="primary">
                    Sign Up <FaSignInAlt />
                  </MDBBtn>
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
  { signUp }
)(withAlert(Signup));
