import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const SelectedMealList = (props) => {

    const {meal, mealIndex} = props;
    console.log(mealIndex);
    


    return (
        <div>
            <br/>
            {!(meal)?<div></div> :
            <Container>
                <li>
                    <Row className="">
                        <Col sm={12} md={8}><strong>Meal name:</strong>{" "}{meal.name}{" "}||{" "}{meal.description}{" "}||{" "}<strong variant="secondary">{meal.mealCategory}</strong> </Col>
                        <Col sm={6} md={4}><button className="bg-danger" onClick={() => props.removeMeal(meal.mealId)}>X</button></Col>
                    </Row>
                </li>
            </Container>
            }
        </div>
    )
}

export default SelectedMealList;
