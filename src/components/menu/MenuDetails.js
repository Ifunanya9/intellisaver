import React from 'react';
import {Button, Row, Col, Card, CardDeck} from 'react-bootstrap';
import { connect } from 'react-redux';
import { firestoreConnect} from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import { deleteMeal } from '../../store/actions/mealActions';
import { deleteImage } from '../../store/actions/mealActions';
import moment from 'moment';
import MenuMealDisplay from './MenuMealDisplay';
import MenuMealDisplayCustomer from './MenuMealDisplayCustomer';
import CreateMenu from './CreateMenu';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const MenuDetails = (props) => {
    const [open, setOpen] = React.useState(true);

    const { menu, auth, user, cartMessage } = props
    console.log(menu);
    

    const onDelete = () => {   
        props.deleteMenu(menu.menuId)
        props.history.push('/')
    }

    // const onEdit = () => {
    //     props.updateMeal(menu)
    //      props.history.push('/')
    //  }

    if(!auth.uid) return <Redirect to='/signin' />

    if(!menu && menu.authId === auth.uid ) return <Redirect to='/new-menu'/>
    return(
        <div>
            <br/>
            {cartMessage ? 
                cartMessage === 'The meal was added succesfully' ?
                <Collapse in={open}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  <AlertTitle>{cartMessage}</AlertTitle>
                  <Link to='/cart' style={{color: 'black'}}>Go to Cart</Link>
                </Alert>
              </Collapse>
              : <Collapse in={open}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                    severity="error"
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {cartMessage}
              </Alert>
            </Collapse>
            : null}
        {user.category !== 'dispatcher' && user.category !== 'caterer' && menu.authId !== auth.uid ? (
        
            <div className="container text-center">
                <br/>
                <br/>
                <Card>
                    <Card.Header>
                        <h2> { menu.menuName } </h2>
                        <h6> { menu.menuTime } || { menu.menuDay } </h6>
                        <p> Posted By: <strong>{ menu.company}</strong></p>
                    </Card.Header>
                    {menu.menuMeals && menu.menuMeals.map((meal, index) => 
                        <div key={index} value={meal}>
                            <MenuMealDisplayCustomer meal={meal} key={index} />
                        </div>
                    )}
                </Card>
                <br/>
                <br/>
            </div>
        
        ):(
            <div className="container text-center">
            <br/>
            <br/>
                <CardDeck>
                    <Card>
                        <Card.Header>
                            <h2> { menu.menuName } </h2>
                            <h6> { menu.menuTime } || { menu.menuDay } </h6>
                            <p> Posted By: <strong>{ menu.company}</strong></p>
                        </Card.Header>
                        {menu.menuMeals && menu.menuMeals.map((meal, index) => 
                            <div key={index} value={meal}>
                            <MenuMealDisplay meal={meal} key={index} />
                            </div>
                        )}
                    </Card>
                </CardDeck>
            <br/>
            <br/>
            </div>
        
        )}
        </div>
    )
}

    

const mapStateToProps = (state, ownProps) => {
    console.log(state); 
    const id = ownProps.match.params.id;
    const menus = state.firestore.data.menus
    const menu = menus ? menus[id] : null
    return{
        menu: menu,
        auth: state.firebase.auth,
        user: state.firebase.profile,
        cartMessage: state.cart.cartMessage,
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
)(MenuDetails);