import React, { Component } from 'react';
import Notifications from './Notifications';
import MealList from '../meals/MealList';
import MenuList from '../menu/MenuList';
import CartList from '../cart/CartList';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
    render(){
        // console.log(this.props)
        const {user, meals, menus, auth, notifications, cart} = this.props;
        console.log(cart);
        console.log(meals);
        console.log(menus);
        
        if (!auth.uid) return <Redirect to= '/'/>
        if (user.category === 'dispatcher') return <Redirect to = '/dispatcher/bookings'/>
        return(
            <div className="container">
                <div className="row">
                <div className="col-sm-12 col-md-6">
                        <MenuList meals={meals} menus={menus} auth={auth} user={user} cart={cart}/>                  
                    </div>
                    <div className="col-sm-12 col-md-6">
                        {/* <CartList cart={cart} auth={auth} user={user} meal={meals}/> */}
                    </div>
                    {/* <div className="col-sm-12 col-md-5 offset-1">
                        <Notifications notifications={notifications}/>
                    </div> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    
    return{
        cart: state.firestore.ordered.cart,
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
        { collection: 'cart', orderBy: ['addToCartAt', 'desc']},
        { collection: 'menus', orderBy: ['menuDay', 'desc']},
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}

    ]))
    (Dashboard);

