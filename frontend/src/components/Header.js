import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
Button } from 'reactstrap';

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (

<div>

<Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
                <NavbarBrand href="/Home">Point of Sales System</NavbarBrand>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href = "/">Sign In</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href = "/Signup">Sign Up</NavLink>
                </NavItem>
                </Nav>
            </Container>
            </Navbar>
</div>
);
export default Header;