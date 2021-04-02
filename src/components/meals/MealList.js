import React, {Component} from 'react';
import MealSummary from './MealSummary';
import { Link } from 'react-router-dom';
import {Col, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addMealToCart} from '../../store/actions/cartActions';
import './MealList.css';
import { updateCartMeal } from '../../store/actions/cartActions';

class MealList extends Component {

    state={
        search: '',
        customerCart: this.props.customerCart
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    updateSearchOne=(e)=>{
        e.preventDefault();
        this.setState({
            search: e.target.value.substr(0,20)
        })
    }

   handleAddMealToCart=(meal)=>{
    console.log(meal);
    console.log(this.props.customerCart);
       const newCart = [];
       const existingCartMealIndex = this.props.customerCart && this.props.customerCart.filter(cartMeal => cartMeal.mealId === meal.mealId)
       if(existingCartMealIndex > 0){
           const cartMeals = this.customerCart.slice();
           const existingMeal = cartMeals[existingCartMealIndex]
           const updatedQuantityCartMeal = {
               ...existingMeal,
               quantity: existingMeal.quantity + 1
           };
           this.props.updateCartMeal(updatedQuantityCartMeal);
       }
       this.props.addMealToCart(meal)
    }

    render(){

    const {meals, auth, user, cart} = this.props;
    console.log(user);
    console.log(meals);




    const mealsFilter = meals && meals.filter((meal) => {
        return (meal.company.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
    })

    const catererMeals = meals && meals.filter((meal) => {
        return meal.authId === auth.uid
        }
    )
    
    return (
        <div>
            {(user.category === 'caterer')?
                catererMeals && catererMeals.map((meal, index) => {
                    return <div key={index}>
                        <Link to={'/meal/' + meal.id} key={meal.id}>
                            <MealSummary meal={meal}/>
                        </Link>
                    </div>
                }) :
                <div>
                    <Form>
                    <Form.Row>
                        <Col md>
                            <Form.Group>
                                <h6>Search by Hotel or Caterer</h6>
                                <input type="text"
                                    placeholder='Search meal...'
                                    className="search"
                                    value={this.state.search}
                                    onChange={this.updateSearchOne}
                                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    </Form>

                    {mealsFilter && mealsFilter.map((meal, index) => {
                        return(
                            <div key={index} style={{width:'100%'}} className="space">
                                <MealSummary meal={meal} addToCart={this.handleAddMealToCart} />
                                <br/>
                            </div>
                        )
                    })}
            </div>
            }
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addMealToCart: (meal) => dispatch(addMealToCart(meal)),
        updateCartMeal: (meal) => dispatch(updateCartMeal(meal))
    }
}

export default connect(null, mapDispatchToProps) (MealList);