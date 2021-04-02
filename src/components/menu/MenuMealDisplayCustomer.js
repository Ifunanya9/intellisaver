import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {addMealToCart} from '../../store/actions/cartActions'
import {connect} from 'react-redux'

const MenuMealDisplayCustomer = (props) => {

    const {meal, mealIndex} = props;
    console.log(mealIndex);
    // const state = {
    //     meal: meal.mealId,
    // }

    const addToCart = () => {
        props.addMealToCart(meal)
    }

    return (
        <div>
            <br/>
            {!(meal)?<div></div> :
            <Container>
                <Row className="">
                        <Col sm={12} md={8} style={{justifyContent: 'right'}}><strong>Name:</strong>{" "}{meal.name}{" "}||{" "}<strong>Description:</strong>{" "}{meal.description}{" "} </Col>
                        <Col sm={2} md={1}><strong>£ {meal.mealCost}</strong></Col>
                        <Col sm={2} md={1}>
                            <Link to={"/meal/"+meal.mealId} key={meal.mealId}>
                                <button type="button" className="btn btn-outline-info">
                                    Details
                                </button>
                            </Link>
                        </Col>
                        <Col sm={2} md={2}><button className="btn-secondary btn" onClick={() => addToCart()}>Add To Cart</button></Col>
                    </Row>
            </Container>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cartMessage: state.cart.cartMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addMealToCart: (meal) => dispatch(addMealToCart(meal))
    }
}

export default connect(null, mapDispatchToProps) (MenuMealDisplayCustomer);
