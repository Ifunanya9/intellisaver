import React, {Component} from 'react';
import {Form, Button, Card, Col} from 'react-bootstrap';
import './SignUp.css';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';
import { signUp } from '../../store/actions/authActions';
import IntelliSaversLogo from '../../logos/IntelliSaver.png';


class SignUp extends Component {

    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        contact: '',
        address: '',
        city: '',
        postcode: '',
        error: ''
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
        if (auth.uid) return <Redirect to='/home'/>
        return(
            <div className = "container">
                <br/>
                <br/>
                <Card className="text-center">
                    <Card.Header>
                        <div className="align-center"><img src={IntelliSaversLogo} alt="intellisavers logo" height="60px" width="160px" /></div>
                        <div className='text-center'> <h5> Enter Personal Information</h5></div>
                    </Card.Header>
                    <Card.Body>
                        <Form className= "text-center" onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Col md>
                                    <Form.Group className="form-layout">
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
                            </Form.Row>
                            <Form.Row>
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
                            </Form.Row>
                                <Form.Group className= "form-layout" >
                                    <Form.Label>Address (optional)</Form.Label>
                                    <Form.Control className="text-center" type="text" id="address" placeholder="First line of Address" onChange={this.handleChange}/>
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
                                        <Form.Control className="text-center" type="text" id="city" placeholder="Enter City name" onChange={this.handleChange}/>
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
                            <h5>Email and Password are Mandatory</h5> 
                             <p className="text-danger">{ authError? <p> {authError} </p> : null} </p>
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
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);