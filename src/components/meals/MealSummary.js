import React from 'react';
import './MealSummary.css'
import {Row, Col} from 'react-bootstrap'
import {addMealToCart} from '../../store/actions/cartActions'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


const MealSummary = (props) => {

    const {meal} = props
    const state = {
        mealId: meal.mealId,
        name: meal.name,
        cost: meal.mealCost,
        type: meal.mealType,
        category: meal.mealCategory,
        img: meal.imageUrl,
        description: meal.description
    }

    const addMealToCart = () => {
        props.addToCart(meal)
    }

    return(
        <div>
            <Row>
                <Col md={7}>
                    <p><strong>Name:  </strong> {meal.name}  <strong>Description: </strong>{meal.description}</p>
                </Col>
                <Col md={2}>
                    <p><strong>£</strong>{meal.mealCost}</p>
                </Col>
                <Col md={3}>
                    <button className="btn btn-outline-dark" onClick={addMealToCart}>Add to Cart </button>
                </Col>
            </Row>
        </div>
    )
}

export default MealSummary;