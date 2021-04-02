import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
// import MealList from '../../meals/MealList';
import {Link} from 'react-router-dom';
import register from '../../../img/meals/meal1.jpg'
import provider from '../../../img/providers/timthumb.jpg'
import cab from '../../../img/pictures/Cab2.png'
// import cab2 from '../../../img/pictures/cab-png-picture.png'
import './landingPage.css'

const LandingPageLinks = () => {
    return(
        <div className='body'>
            <Container>
                <br/>
                <Row>
                    <Col md={{ span: 12, offset: 0 }}>
                        <div className='text-center' >
                            <h2 variant='secondary'> Treat yourself to meals from the best caterers  </h2>
                        </div>
                    </Col>
                </Row>  
                <br/>
                <br/>              
                {/* <Row>
                    <div className='' variant='secondary'>
                    <Col md={{ span: 6, offset: 3 }}>
                        <MealList/>
                    </Col>
                    </div>
                </Row> */}
                <Row>
       
                    <Col xs={6} md={4}>
                        <Link to='/signin'>
                            <div className='text-center'>
                                <div >
                                    <img src={register} alt="links" height="300px" width="300px" />
                                </div>
                                <div> 
                                    <h5 style={{color: 'lawngreen'}}>Enjoy your meal</h5>
                                </div>
                             </div>
                        </Link>
                    </Col>

                    <div>                   
                    <Col xs={6} md={4}>
                        <Link to='/provider/signup'>
                            <div className='text-center'>
                                <img src={provider} alt="links" height="300px" width="300px" />
                            </div>
                            <div className='text-center' style={{width: '300px'}}> 
                                <h5 style={{color: 'lawngreen'}}>Partner with us</h5>
                            </div>
                        </Link>
                    </Col>
                    </div>

                    <Col xs={6} md={4}>
                        <Link to='/dispatcher/signup'>
                            <div className='text-center'>
                                <div>
                                    <img src={cab} alt="links" height="300px" width="300px" />
                                </div>
                                <div> 
                                    <h5 style={{color: 'lawngreen'}}>Dispatch for us</h5>
                                </div>
                            </div>
                        </Link>
                    </Col>

                </Row>
                <br/>
                <br/>
                <Row>
                    <Col md={{ span: 12, offset: 0 }}>
                        <div className='text-center' >
                            <h2 variant='secondary'className='center' > Sustainable, Safe, Healthy and Delicious</h2>
                        </div>
                    </Col>
                </Row>  
                <br/>
                <br/>   
            </Container>
        </div>
    )
}

export default LandingPageLinks;