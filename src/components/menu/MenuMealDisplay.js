import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const MenuMealDisplay = (props) => {

    const {meal, mealIndex} = props;
    console.log(mealIndex);

    if(!meal){
        return "No meal to display"
    } else {
        return(
            <Row>
                <Col sm={12} md={8} className="text-align"><strong>Name:</strong>{" "}{meal.name}{" "}||{" "}<strong>Description:</strong>{" "}{meal.description}{" "}||{" "}<strong>£ {meal.mealCost}</strong> </Col>
                <Col sm={3} md={2}><button className="btn btn-danger" onClick={() => props.removeMeal(meal.mealId)}>X</button></Col>
                <Col sm={3} md={2}><button className="btn btn-secondary" onClick={() => props.editMeal(meal.mealId)}>Edit</button></Col>
            </Row>
        )
    }
}

export default MenuMealDisplay;
