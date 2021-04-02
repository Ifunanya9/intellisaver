import React, {Component} from 'react';
import {Form, Button, Col, Row, Card} from 'react-bootstrap';
import './Signin.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUpProvider } from '../../store/actions/authActions';
import IntelliSaversLogo from '../../logos/IntelliSaver.png';

class SignUpProvider extends Component {

    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        contact: '',
        company: '',
        address: '',
        city: '',
        postcode: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
       this.props.signUp(this.state);
    }

    render() {
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to='/meals/provider'/>
        return(
            <div className = "container">
                <br/>
                <br/>
                <Card className="text-center">
                    <Card.Header>
                        <div className="align-center"><img src={IntelliSaversLogo} alt="intellisavers logo" height="60px" width="160px" /></div>
                        <div className='text-center'> <h5>Register as Caterer</h5></div>

                    </Card.Header>
                    <Card.Body>
                        <Form className= "text-center" onSubmit={this.handleSubmit}>
                            <Row>
                                <Col md>
                                    <Form.Group>
                                        <Form.Label>Firstname</Form.Label>
                                        <Form.Control className="text-center" type="text" id="firstName" placeholder="Firstname" onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>

                                <Col md>
                                    <Form.Group className= "form-layout" >
                                        <Form.Label>Lastname</Form.Label>
                                        <Form.Control className="text-center" type="text" id="lastName" placeholder="Lastname" onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md>
                                    <Form.Group className= "form-layout" >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control className="text-center" type="email" id="email" placeholder="Enter email" onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>

                                <Col md>
                                    <Form.Group className= "form-layout" >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control className="text-center" type="password" id="password" placeholder="Password" onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className= "form-layout" >
                                <Form.Label>Caterer</Form.Label>
                                <Form.Control required className="text-center" type="text" id="company" placeholder="Enter company name" onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group className= "form-layout" >
                                <Form.Label>Address</Form.Label>
                                <Form.Control className="text-center" type="text" id="address" placeholder="Enter your address" onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Row>
                                <Col md>
                                    <Form.Group className= "form-layout" >
                                        <Form.Label>Contact</Form.Label>
                                        <Form.Control className="text-center" type="number" id="contact" placeholder="Phone number" onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>

                                <Col md>
                                    <Form.Group className= "form-layout" >
                                        <Form.Label>City/Town</Form.Label>
                                        <Form.Control className="text-center" type="text" id="city" placeholder="City" onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group className= "form-layout" >
                                        <Form.Label>PostCode</Form.Label>
                                        <Form.Control className="text-center" type="text" id="postcode" placeholder="Enter Postcode" onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <div className="align-center">
                                <Button variant="secondary" type="submit" className="btn button">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>

                    <Card.Footer className="text-muted">
                        <div>
                            <p>Email and Password are Mandatory</p> 
                             <p>{ authError? <p> {authError} </p> : null} </p>
                        </div> 
                    </Card.Footer>
                </Card>
                <br/>
                <br/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signUp: (newProvider) => dispatch(signUpProvider(newProvider))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpProvider);