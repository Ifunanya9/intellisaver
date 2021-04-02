import React from 'react';
import {Button, Popover, OverlayTrigger, Card, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { firestoreConnect} from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import { deleteMeal } from '../../store/actions/mealActions';
import { deleteImage } from '../../store/actions/mealActions';
import moment from 'moment';

const MealDetails = (props) => {

   const {meal, auth, user, menus} = props
    console.log(meal);


    const onDelete = () => {
        props.deleteImage(meal.imageUrl)     
        props.deleteMeal(meal.mealId)
        props.history.push('/')
    }

    const addToTray = () => {

    }
    

    // const onDelete = () => {
    // }

    // const onEdit = () => {
    //     props.updateMeal(meal)
    //      props.history.push('/')
    //  }

    if(!auth.uid) return  <Redirect to='/signin' />
    if(meal && user.category === 'caterer' && meal.authId === auth.uid){
        return(
            <div className="container text-center">
                <Card className="text-center">
                <Card.Header>
                    <h3> <strong>Meal Details</strong></h3>
                </Card.Header>
                <Card.Body>
                    <Col>
                    <br/>
                    <h5><img src={meal.imageUrl} alt='this is a food' width='365'height='315' /></h5>
                    <h5><strong>Meal Name: </strong>{ meal.name }</h5>
                    <h6><strong>Description: </strong>{ meal.description }</h6>
                    <h6><strong>Type: </strong>{ meal.mealType }</h6>
                    <h6><strong>Category: </strong> { meal.mealCategory}</h6>
                    <h6><strong>Cost: £</strong>{ meal.mealCost}</h6>
                    <p><strong>Posted By: </strong>{ meal.authorFirstName } { meal.authorLastName }</p>
                    <h6><strong>Company: </strong> { meal.company}</h6>
                    {/* <div>{moment(createdAt.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</div> */}
                    </Col>
                    </Card.Body>
                    <Link to={'/meal/' + meal.id + '/edit'}>
                        <button>Update</button>
                    </Link>
                    <br/>
                    <Card.Footer>

                        <Button variant= 'secondary' onClick={onDelete}>
                                Delete
                        </Button>
                 </Card.Footer>
            </Card>
            <br/>
            </div>
        )
    } else {
            return (
                <div className="container text-center">
                    <Card className="text-center">
                        <Card.Header>
                            <h3> <strong>Meal Details</strong></h3>
                        </Card.Header>
                        <Card.Body>
                            <br/>
                            <h5><img src={meal.imageUrl} alt='this is a food' width='365'height='315' /></h5>
                            <h5> Meal Name: { meal.name }</h5>
                            <h6> Description: { meal.description }</h6>
                            <h6> Type: { meal.mealType }</h6>
                            <h6> Category: { meal.mealCategory}</h6>
                            <h6> Cost: £{ meal.mealCost}</h6>
                            <h6> Company: { meal.company}</h6>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant= 'secondary' onClick={addToTray}>
                                    Add to Tray
                            </Button>
                        </Card.Footer>
                    </Card>
                    <br/>
                </div>
            )
    }


   
}



const mapStateToProps = (state, ownProps) => {
    console.log(ownProps); 
    const id = ownProps.match.params.id;
    const meals = state.firestore.data.meals
    const meal = meals ? meals[id] : null
    return{
        meal: meal,
        auth: state.firebase.auth,
        user: state.firebase.profile,
        menus: state.firestore.data.menus
    }
}

const mapDispatchToProps = (dispatch) => {
    
    return{
        deleteMeal: (id) => dispatch(deleteMeal(id)),
        deleteImage: (imageUrl) => dispatch(deleteImage(imageUrl))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'meals'},
        {collection: 'menus'}
    ])
)(MealDetails);