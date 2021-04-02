import React, { Component } from 'react';
import Notifications from '../dashbaord/Notifications';
import MealList from '../meals/MealList';
import MenuList from '../menu/MenuList';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const MealDashboard = (props) => {
    // console.log(this.props)
    const [open, setOpen] = React.useState(true);
    const {user, meals, menus, auth, notifications, cartMessage, cart} = props;
    console.log(cart);

    const customerCart =  cart && cart.filter((cartMeal) => cartMeal.userId === auth.uid)

    if (!auth.uid) return <Redirect to= '/'/>
    if (user.category === 'dispatcher') return <Redirect to = '/dispatcher/bookings'/>
    return(
        <div>
            <br/>
            {cartMessage ? 
                cartMessage === 'The meal was added succesfully' ?
                <Collapse in={open}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  <AlertTitle>{cartMessage}</AlertTitle>
                  <Link to='/cart' style={{color: 'black'}}>Go to Cart</Link>
                  
                </Alert>
              </Collapse>
              : <Collapse in={open}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                    severity="error"
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                 null
                
              </Alert>
            </Collapse>
            : null}
        <div className="container">

            <div >
                <div className="row">
                    <MealList meals={meals} auth={auth} customerCart={customerCart} user={user} cartMessage = {cartMessage} />
                </div> 
                {/* <div className="col-sm-12 col-md-5 offset-1">
                    <Notifications notifications={notifications}/>
                </div> */}
            </div>
        </div>
        </div>
    )
}

const mapStateToProps = (state) => {  
  console.log(state);
  console.log(state.firestore.ordered.cart);
    return{
        menus: state.firestore.ordered.menus,
        meals: state.firestore.ordered.meals,
        auth: state.firebase.auth,
        user: state.firebase.profile,
        cart: state.firestore.ordered.cart,
        // notifications: state.firestore.ordered.notifications,
        // cartMessage: state.cart.cartMessage,
    }

}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'meals', orderBy: ['createdAt', 'desc']},
        { collection: 'menus', orderBy: ['menuDay', 'desc']},
        { collection: 'cart', orderBy: ['addToCartAt:', 'desc']},
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}

    ]))
    (MealDashboard)
    

