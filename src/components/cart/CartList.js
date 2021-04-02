import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import Cart from './Cart';
import CartTotal from './CartTotal';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {deleteCartMeal, addQuantity,  lessQuantity} from '../../store/actions/cartActions'
import { compose } from 'redux';
import CartColumns from './CartColums';

class CartList extends Component {
    state = {
        cartMeal:this.props.cart,
        quantity: 0,
        id: ''
    }




    // total = () => this.state.cartSubTotal + this.state.cartTax
    // tax = () => this.state.cartSubTotal * 1
    // subTotal = () => this.state.cartSubTotal + this.state.cartTax

    
    decreaseQuantity = (e, meal) => {
        e.preventDefault();
        this.props.lessQuantity(meal)
        this.props.history.push('/cart')
    }

    increaseQuantity = (e, meal) => {
        e.preventDefault();
        this.props.addQuantity(meal);
        this.props.history.push('/cart')
    };

    render(){

        const customerCart = this.state.cartMeal && this.state.cartMeal.filter(meal => {
            console.log(meal);
            return meal.userId === this.props.auth.uid
        })



        const cartQuantity = customerCart.length;

        const {cart , meal, auth} = this.props;
    
        if(!auth.uid) return <Redirect to='/login' />
    
        
    
        return(
            <div>
                
                {customerCart.length > 0 ?
                <div>
                    <CartColumns/>
                    
                    {customerCart && customerCart.map((meal, index) => {
                        console.log(meal);
                        return(
                            <div key={index}>
                                <div className = 'container' key={index}>
                                    <Cart deleteCartMeal={this.props.deleteCartMeal} meal={meal} index={index}  addTotals={this.addTotals} decreaseQuantity={this.decreaseQuantity} increaseQuantity={this.increaseQuantity}/>
                                </div>
                            </div>
                        )
                    })}
                    <CartTotal cart={customerCart} history={this.props.history} style={{left:'0'}}/>
                    </div>
                    :  (
                        <div>
                            <br/><br/>
                                <div  className='text-black'>
                                    <div><h1>Nothing in cart</h1></div>
                                </div>
                            <br/><br/>
                        </div>
                    )
                }
                
            </div>
        )
    }


}

const mapStateToProps = (state) => {
    console.log(state);
    return{
        cart: state.firestore.ordered.cart,
        auth: state.firebase.auth,
        user: state.firebase.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deleteCartMeal: (meal) => dispatch(deleteCartMeal(meal)),
        lessQuantity: (meal) => dispatch(lessQuantity(meal)),
        addQuantity: (meal) => dispatch(addQuantity(meal))
    }
  }

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'cart', orderBy: ['addToCartAt', 'desc']},
    ]))
(CartList);