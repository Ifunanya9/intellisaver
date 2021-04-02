import React from 'react'
import { Navbar } from 'react-bootstrap';
import Signedinlinks from './Signedinlinks';
import Signedoutlinks from './Signedoutlinks';
import { connect } from 'react-redux';
import IntelliSaversLogo from '../../../logos/IntelliSaver.png'
import "./Header.css"
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';


const Header = (props) => {
    const { auth, profile} = props;

    console.log(auth);

    
    const Links = !auth.uid ? <Signedoutlinks/> : <Signedinlinks profile={profile}/> ;
    return (    
        <div>
            <div className="Img bg-blue align-items"><img src={IntelliSaversLogo} alt="intellisavers logo"  height="50px" width="100px" /></div>
            <div>
                <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark" sticky="top" >
                    {auth.uid ? <Navbar.Brand href='/home'>Intellisaver</Navbar.Brand> : <Navbar.Brand href='/'>Intellisaver</Navbar.Brand>}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <div>
                            {Links}
                        </div>
                </Navbar> 
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
    
}


export default connect(mapStateToProps)(Header);
  