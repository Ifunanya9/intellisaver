import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PayPalButton from './PayPalButton'

const CartTotal = (props) => {

    const subTotal = props.cart.reduce((totalCost,currentMealCost) => Number(totalCost) + Number(currentMealCost.total), 0)

    const tax = parseFloat((subTotal * 0.1).toFixed(2));

    const total = subTotal + tax;


        return (
            <div className="container">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                        {/* <Link to="/">
                            <button className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button" onClick={()=>clearCart()}>clear cart</button>
                        </Link> */}
                        <h5>
                            <span>Subtotal : </span>
                            <strong>£{subTotal}</strong>
                        </h5>
                        <h5>
                            <span>tax : </span>
                            <strong>£{tax}</strong>
                        </h5>
                        <h5>
                            <span>Cart Total : </span>
                            <strong>£{total}</strong>
                        </h5>
                        <PayPalButton total={total} clearCart={props.clearCart} history={props.history.push}/>
                    </div>
                </div>
            </div>

        )
    }

export default CartTotal
