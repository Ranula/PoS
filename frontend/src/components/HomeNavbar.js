import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container } from 'reactstrap';

class HomeNavbar extends Component {
    state ={
        isOpen: false
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    } 

    render(){
        return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
                <NavbarBrand href="/Home">Home</NavbarBrand>
                <NavbarToggler onClick ={this.toggle}/>
                <Collapse isOpen = {this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                </Nav>
                <NavItem>
                    <NavLink href = "/">LogOut</NavLink>
                </NavItem>
                </Collapse>
            </Container>
            </Navbar>
        </div>
        )
    }
}
 export default HomeNavbar