import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { updateMeal } from '../../store/actions/mealActions';
import { mealTypes } from '../../constants/MealType';


class MealUpdate extends Component{
    state = {
        name: '',
        description: '',
        mealType: '',
        recipe: [],
        portion:''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
    //    console.log(this.state);
        this.props.updateMeal(this.state)
        this.props.history.push('/')
    }

    render() {
        
        const {auth, meal} = this.props;

        if(!auth.uid) return <Redirect to='/signin' />
        if(meal == null) return <Redirect to='/meals' />
        return(
            <div className="container">
                
            <Form className= "form-layout" onSubmit={this.handleSubmit}>  
                <h5>Update meal</h5>
                <Form.Group className="form-layout" >
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" id="name" placeholder={meal.name} onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group className= "form-layout" >
                    <Form.Label>Description:</Form.Label>
                    <Form.Control type="text" id="description" placeholder={meal.description} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group>
                    <select
                        id = 'mealType' 
                        className="custom-select" 
                        onChange={this.handleChange}>
                        <option selected disabled>Select meal type</option>
                       {mealTypes.map((x, y) => <option key={y} value={x}>{x}</option>)}
                    </select>
                </Form.Group>
                <Form.Group>
                    <select
                        id = 'recipe' 
                        className="custom-select" 
                        onChange={this.handleChange}>
                        <option selected disabled>Select recipe</option>
                       {mealTypes.map((x, y) => <option key={y} value={x}>{x}</option>)}
                    </select>
                </Form.Group>

                <Form.Group>
                    <Form.Control type="number" id="portion" placeholder="Enter portions" onChange={this.handleChange}/>
                </Form.Group>

                <Button variant="secondary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps); 
    const id = ownProps.match.params.id;
    const meals = state.firestore.data.meals
    const meal = meals ? meals[id] : null
    console.log(meal);
    return{
        auth: state.firebase.auth,
        meal: meal
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        createMeal: (meal) => dispatch(updateMeal(meal))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MealUpdate);