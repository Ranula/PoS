import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
Button } from 'reactstrap';

class HomeNavbar extends Component {
    state ={
        isOpen: false
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    } 

    logout(){
        localStorage.clear();
    }

    render(){
        return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
                <NavbarBrand href="/Home">Point of Sales System</NavbarBrand>
                <NavbarToggler onClick ={this.toggle}/>
                <Collapse isOpen = {this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <Button onClick={this.logout()} href = "/">LogOut</Button>
                </NavItem>
                </Nav>
             
                </Collapse>
            </Container>
            </Navbar>
        </div>
        )
    }
}
 export default HomeNavbar