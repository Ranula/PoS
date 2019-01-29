import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Button
} from "reactstrap";
import setAuthToken from "../utils/tokens";
import { FaSignOutAlt } from "react-icons/fa";
class HomeNavbar extends Component {
  state = {
    isOpen: false
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  logout() {
    localStorage.removeItem("token");
    // setAuthToken(false);
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/Home">
              <img
                height="7%"
                width="7%"
                hspace="20"
                src={require("../public/pos.png")}
                alt="pos"
              />{" "}
              Point of Sales System
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button onClick={this.logout()} href="/">
                    LogOut <FaSignOutAlt />
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
export default HomeNavbar;
