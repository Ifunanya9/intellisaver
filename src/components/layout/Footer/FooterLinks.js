import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';


const FooterLinks = () => {
    return(
        <div className='bottom'>
            <Container>
                <Row>
                    <Col>
                        <div className="footer__column col-xs-12 col-md-3"> 
                            <h4 className="heading footer__heading"> <i className="fa fa-list"></i> Categories </h4> 
                            <div className="footer__content"> 
                                <ul className="list-unstyled"> 
                                    <li itemProp="itemListElement" itemScope="" itemType="http://schema.org/ListItem"> 
                                        <a href="/about/" itemProp="item" itemScope="itemscope" itemType="http://schema.org/Thing"> 
                                            <strong>About</strong>
                                        </a> 
                                        <meta itemProp="position" content="1"/> 
                                            
                                    </li> 
                                </ul> 
                            </div> 
                        </div>
                    </Col>

                    <Col>
                        <div className="footer__column col-xs-12 col-md-3 "> 
                            <h4 className="heading footer__heading">  <i className="fa fa-info"></i>
                                Information 
                            </h4> 
                        <div className="footer__content"> 
                            <ul className="list-unstyled">
                                <li itemProp="itemListElement" itemScope="" itemType="http://schema.org/ListItem">
                                    <a href="/contact-us" itemProp="item" itemScope="itemscope" itemType="http://schema.org/Thing">
                                        <strong>Contact</strong>
                                    </a> 
                                    <meta itemProp="position" content="2"/> 
                                </li> 
                                <li itemProp="itemListElement" itemScope="" itemType="http://schema.org/ListItem"> 
                                    <a href="/terms/" itemProp="item" itemScope="itemscope" itemType="http://schema.org/Thing"> 
                                        <strong>Terms</strong>
                                    </a> 
                                    <meta itemProp="position" content="3"/> 
                                </li> 
                                <li itemProp="itemListElement" itemScope="" itemType="http://schema.org/ListItem"> 
                                    <a href="" itemProp="item" itemScope="itemscope" itemType="http://schema.org/Thing"> 
                                        <strong>FAQ </strong>
                                    </a> 
                                    <meta itemProp="position" content="4"/> 
                                </li> 
                                <li itemProp="itemListElement" itemScope="" itemType="http://schema.org/ListItem"> 
                                    <a href="" itemProp="item" itemScope="itemscope" itemType="http://schema.org/Thing"> 
                                        <strong>Legal</strong>
                                    </a> 
                                    <meta itemProp="position" content="5"/> 
                                </li> 
                                <li itemProp="itemListElement" itemScope="" itemType="http://schema.org/ListItem"> 
                                    <a href="" itemProp="item" itemScope="itemscope" itemType="http://schema.org/Thing"> 
                                        <strong>Privacy</strong> 
                                    </a> 
                                    <meta itemProp="position" content="6"/> 
                                </li> 
                            </ul> 
                        </div> 
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default FooterLinks