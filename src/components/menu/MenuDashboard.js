import React, { Component } from 'react';
import Notifications from '../dashbaord/Notifications';
import MealList from '../meals/MealList';
import MenuList from './MenuList'
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { menuDays } from '../../constants/MenuTime';

class Dashboard extends Component {
    render(){
        // console.log(this.props)
        const {user, meals, menus, auth, notifications} = this.props;
        console.log(user);
        console.log(meals);
        
        
        if (!auth.uid) return <Redirect to= '/'/>
        if (user.category === 'dispatcher') return <Redirect to = '/dispatcher/bookings'/>
        return(
            <div className="container">
                <div className="row">
                <div className="col-sm-12 col-md-6">
                        <MenuList meals={meals} menus={menus} auth={auth} user={user}/>
                    </div>
                    <div className="col-sm-12 col-md-5 offset-1">
                        {/* <MealList meals={menus.menuMeals}/> */}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => { 
    console.log(state);
     
    return{
        menus: state.firestore.ordered.menus,
        meals: state.firestore.ordered.meals,
        auth: state.firebase.auth,
        user: state.firebase.profile,
        notifications: state.firestore.ordered.notifications
    }

}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'meals', orderBy: ['createdAt', 'desc']},
        { collection: 'menus', orderBy: ['menuDay', 'desc']},
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}

    ]))
    (Dashboard);