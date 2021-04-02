import React, { Component } from 'react'
// import {Form, Group} from 'react-bootstrap';
import { Redirect, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {createMenu} from '../../store/actions/menuActions';
import { Button, Col, Form, Card , CardGroup} from 'react-bootstrap';
import {compose} from 'redux';
import {menuTimes} from '../../constants/MenuTime';
import {menuDays} from '../../constants/MenuTime';
import { firestoreConnect } from 'react-redux-firebase';
import SelectedMealList from './SelectedMealList';
import './menu.css'


class CreateMenu extends Component {

    state={
        search: '',
        menuName: '',
        menuMeals: [],
        date: '',
        menuTime: '',
        menuDay: '',
        errorMessage: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.menuName !== '' && this.state.menuMeals.length > 0 && this.state.menuTime !== '' && this.state.menuDay !== '' ){
            this.props.createMenu(this.state)
            this.props.history.push('/menus')
        } else {
         const err = "Please complete all fields and add meal"
         this.setState({
            errorMessage: err
         })
        }
    }

    updateSearch=(e) => {
        e.preventDefault();
        this.setState({search: e.target.value.substr(0,20)})
    }

    handleMealSelect = (meal) => {
        const existingMeal = this.state.menuMeals && this.state.menuMeals.filter(m => meal.mealId === m.mealId);
        if(existingMeal.length > 0){
            const err = "Meal already added to Menu"
            this.setState({
                errorMessage: err
            })
        } else {
            this.setState({
                menuMeals: [...this.state.menuMeals, meal],
                errorMessage: ''
            });
        }  
    }


    handleRemoveMeal=(id) => {
        const extractedMeals = this.state.menuMeals && this.state.menuMeals.filter(m => id !== m.mealId);
        this.setState({
            menuMeals: extractedMeals
        })
    
    }


    
    render() {
        console.log("menu check", this.state.menuMeals);
        const {errorMessage, menuMeals} = this.state;
        const {meals, auth, user, menus} = this.props;
        console.log(menus);
        console.log(menuMeals.length);
        
        if(!auth.uid) return <Redirect to='/signin' />

        const catererMeals = meals && meals.filter((meal) => {
             return (meal.authId === auth.uid) && (meal.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
        });

        return (
            <div className = "container">
                {(user.category === "caterer")?
                <div>
                <CardGroup>
                    <Card>
                    <Button variant="secondary"><strong>Selected Meals</strong></Button>
                        <ul>     
                            {this.state.menuMeals && this.state.menuMeals.map((meal, index) => {
                                return(
                                    <ul key={index} value={meal}>
                                        <SelectedMealList meal={meal} mealIndex={index} removeMeal={this.handleRemoveMeal}/>
                                    </ul>
                                )
                            })}
                        </ul>          
                    </Card>
                </CardGroup>
                <Card className="text-center">
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>
                                <Form.Row>
                                    <Col md>
                                    <Form.Group>
                                        <select
                                            defaultValue= 'Select Menu Time'
                                            id = 'menuTime' 
                                            className="custom-select" 
                                            onChange={this.handleChange}>
                                            <option disabled>Select Menu Time</option>
                                            {menuTimes.map((x, y) => <option key={y} value={x}>{x}</option>)}
                                        </select>
                                    </Form.Group>
                                    </Col>
                                    <Col md>
                                    <Form.Group>
                                        <Form.Check>
                                        <select
                                            defaultValue= 'Select Day'
                                            id = 'menuDay' 
                                            className="custom-select" 
                                            onChange={this.handleChange}>
                                            <option disabled>Select Day</option>
                                            {menuDays.map((x, y) => <option key={y} value={x}>{x}</option>)}
                                        </select>
                                        </Form.Check>
                                    </Form.Group>
                                    </Col>
                                    <Col md>
                                        <Form.Group className= "form-layout" >
                                            <Form.Control className="text-center" type="date" id="date" placeholder="Date" onChange={this.handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md>
                                        <Form.Group className= "form-layout" >
                                            <Form.Control className="text-center" type="text" id="menuName" placeholder="Assign name" onChange={this.handleChange}/>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>

                                <Button className="space" variant="secondary" type="submit">
                                        Submit Menu
                                </Button>

                                <p className="text-danger">{errorMessage}</p>
                      
                                <Form.Row>
                                    <Col md>
                                        <Form.Group>
                                            <input type="text"
                                            placeholder='Search meal......'
                                            value={this.state.search}
                                            onChange={this.updateSearch}
                                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                            </Form>
                    </Card.Body>
                    <Card.Body>
                    {
                       catererMeals && catererMeals.map((meal, index)=>{
                           return <div key={index} value={meal}>
                            <CardGroup>
                                <Card>                                            
                                    <Button variant="secondary" onClick={(e)=> this.handleMealSelect(meal)}>Add to Menu</Button>
                                        <Card.Body>
                                            <Link to={'/meal/'+meal.id} key={meal.id}>
                                                <Card.Title><strong>{meal.name}</strong></Card.Title>
                                                <Card.Text>{meal.description}</Card.Text>
                                            </Link>
                                        </Card.Body>
                                    <Card.Footer>
                                        <div><strong>Cost: </strong>£{meal.mealCost}<strong>{' || '}{meal.mealCategory}</strong></div>
                                    </Card.Footer>
                                </Card>
                            </CardGroup>
                           </div>
                        })}
                    </Card.Body>
                </Card>
                </div> : 
                <div></div>
            }
            <br/>
            <br/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log(state);
    return{
        auth: state.firebase.auth,
        meals: state.firestore.ordered.meals,
        user: state.firebase.profile,
        menus: state.firestore.ordered.menus
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        createMenu: (menu) => dispatch(createMenu(menu))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'meals', orderBy: ['createdAt', 'desc']}
    ]))(CreateMenu);