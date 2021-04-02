import React from 'react';
import { Navbar, NavDropdown, Nav, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/authActions';


const Signedinlinks = (props) => {
    const category = props.profile.category;
    const initials = props.profile.initials;
    const {cart, auth} = props
    
    const customerCart = cart && cart.filter(meal => {
        console.log(meal);
        return meal.userId === auth.uid
    })
    // console.log(customerCart);

    // const cartQuantity = customerCart.length;
    
    if(category !== "dispatcher" && category !== "customer" && category !== "caterer" ){
        return <div></div>
    }

    if(category !== "dispatcher" && category !== "customer"){
        return(
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/meals">Meals</Nav.Link>
                    <Nav.Link href="/menus">Menu</Nav.Link>
                    <Nav.Link href="/caterer/orders">Orders</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/new-meal">Create Meal</Nav.Link>
                    <Nav.Link href="/new-menu">Create Menu</Nav.Link>
                    <NavDropdown title="Account"  id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/caterer/account">Manage your Account</NavDropdown.Item>
                        <NavDropdown.Item href="/caterer/select-dispatcher">Book Dispatcher</NavDropdown.Item>
                        <NavDropdown.Item href="/caterer/inbox">Inbox</NavDropdown.Item>
                        <NavDropdown.Item href="/caterer/reviews">Feedback & Complaints</NavDropdown.Item>
                        <NavDropdown.Item href="/support">Support</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/" onClick={props.signOut}>Sign-out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        )}
        
        if(category !== "caterer" && category !== "customer"){
            return(
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/dispatcher/bookings">Bookings</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/order">Order Meal</Nav.Link>
                    <NavDropdown title="Account"  id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/dispatcher/account">Manage your Account</NavDropdown.Item>
                        <NavDropdown.Item href="/caterer/inbox">Inbox</NavDropdown.Item>
                        <NavDropdown.Item href="/caterer/reviews">Feedback & Complaints</NavDropdown.Item>
                        <NavDropdown.Item href="/support">Support</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/" onClick={props.signOut}>Sign-out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            )}
            if(category !== "dispatcher" && category !== "caterer" ){
            return(
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/menus">Menu</Nav.Link>
                    <Nav.Link href="/meals">Meals</Nav.Link>
                    <Nav.Link href="/place-order">Place Order</Nav.Link>
                    <Nav.Link href="/cart">Cart</Nav.Link>
                    <Nav.Link>{initials}</Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown title="Account"  id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/dispatcher/account">Manage your Account</NavDropdown.Item>
                        <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
                        <NavDropdown.Item href="/caterer/inbox">Inbox</NavDropdown.Item>
                        <NavDropdown.Item href="/caterer/reviews">Feedback & Complaints</NavDropdown.Item>
                        <NavDropdown.Item href="/support">Support</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/" onClick={props.signOut}>Sign-out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav className="mr-auto">
                <Button type="button" variant="primary">
                    <Nav.Link href="/cart">
                        Tray ||
                        {/* {cartQuantity} */}
                    </Nav.Link>
                </Button>
                </Nav>
            </Navbar.Collapse>
            )
        }
}

const mapStateToProps = (state) => {
    console.log(state);
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        cart: state.firestore.ordered.cart,
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signedinlinks);