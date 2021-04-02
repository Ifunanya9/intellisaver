import React, {Component} from 'react';
import {Form, Button, Card, OverlayTrigger, Popover, Row, Col} from 'react-bootstrap';
import './Signin.css';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect, Link} from 'react-router-dom';
import IntelliSaversLogo from '../../logos/IntelliSaver.png';
// import PopOver from '../test/WordLimitSory';

class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
    }

    render() {
        const {authError, auth} = this.props;
        if(auth.uid) return <Redirect to='/home'/>
        return(
            <div className="container">
                <br/>
                <br/>
                <Card className="text-center">
                    <Card.Header className=" bg-navy">
                        <div className="align-center"><img src={IntelliSaversLogo} alt="intellisavers logo" height="60px" width="160px" /></div>
                        <div className='text-center'> <h5> LOGIN</h5></div>
                    </Card.Header>
                    <Card.Body>
                        <Form className="text-center"  onSubmit={this.handleSubmit}>
                            <Form.Group className="form-layout" >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control className="text-center" type="email" id="email" placeholder="Enter email address" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control className="text-center" type="password" id="password" placeholder="Enter 8 character Password" onChange={this.handleChange}/>
                            </Form.Group>
                            <Button variant="secondary" type="submit">
                                Login
                            </Button>
                            <div className='text-danger'>{authError ? <p> {authError}</p> : null}</div>
                            <br/>
                            {/* <div>
                                <h4> Not Registered?</h4>
                                <Link to='/signup'>
                                <h4> Signup </h4>
                            </Link>
                            </div>                             */}
                            <div>
                                <h5> Not Registered?</h5>
                                <OverlayTrigger trigger="click" placement="bottom" overlay={
                                    <Popover id="popover-basic">
                                        <Popover.Title as="h3" className= 'text-center'>Select Category</Popover.Title>
                                        <Popover.Content>
                                            <Row>
                                                <Col md>
                                                    <Link to='/user/signup'>
                                                        User
                                                    </Link>
                                                </Col>
                                                <Col md>
                                                    <Link to='/provider/signup'>
                                                        Caterer
                                                    </Link>
                                                </Col>
                                                <Col md>
                                                    <Link to='/dispatcher/signup'>
                                                        Dispatcher
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </Popover.Content>
                                      </Popover>}>
                                    <Button variant="non"><h4>Signup</h4></Button>
                                </OverlayTrigger>
                            </div>
                            <br/>
                        </Form>
                    </Card.Body>
                        <Card.Footer className="text-muted">Offering good and healthy meal to our esteemed customers is our Goal</Card.Footer>
                </Card>
                <br/>
                <br/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
