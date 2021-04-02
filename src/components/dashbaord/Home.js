import React, { Component } from 'react'
// import landingPage from "../../img/Landing page.png"
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LandingPage from '../layout/landingPage/LandingPage';

class Home extends Component {
    render() {
        const { auth, profile } = this.props;
        console.log(profile);
        
        if (auth.uid) return <Redirect to= '/home'/>
        return (
            <div>
                <LandingPage />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
    
}

export default connect(mapStateToProps)(Home)
