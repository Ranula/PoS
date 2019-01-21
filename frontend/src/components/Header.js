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
//   <div className="text-center">
//     <h1>
//       <a href="/#/">Home</a>
//     </h1>
//     <ul className="nav-menu">
//       <li className="lead">
//         <Link to="/Login">Login</Link>
//       </li>
//       <li className="lead">
//         <Link to="/Signup">Signup</Link>
//       </li>
//     </ul>
//   </div>


<div>

<Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
                <NavbarBrand href="/Home">Point of Sales System</NavbarBrand>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href = "/Login">Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href = "/Signup">Signup</NavLink>
                </NavItem>
                </Nav>
            </Container>
            </Navbar>
</div>
);
export default Header;