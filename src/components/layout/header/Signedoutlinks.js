import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';


const Signedoutlinks = () => {
    return (
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/signin">Login</Nav.Link>
                <Nav.Link href="signup"> Signup</Nav.Link>
            </Nav>
        </Navbar.Collapse> 
    )
}

export default Signedoutlinks;