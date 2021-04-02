import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import {connect} from 'react-redux'
// import {CardGroup, Card} from 'react-bootstrap';
import {compose} from 'redux'
import {RiDeleteBin6Line} from 'react-icons/ri'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { Row } from 'react-bootstrap'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const Cart = (props) => {
  const state = {
    quantity: props.meal.quantity,
    id: props.meal.cartId,
    mealCost: props.meal.mealCost,
  }

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {meal} = props;
  
  if(meal.quantity === 0){
    {props.deleteCartMeal(meal.cartId)}
  }
  console.log(meal);
  
  return (
    <div className='container'>
      <br/>
      <div className="row my-2 text-capitalize text-center">
     
            <div className="col-10 mx-auto col-lg-2">
            <Link to={'/meal/' + meal.mealId} key={meal.mealId} style={{textDecoration: 'none', color: 'black'}}>
                <img src={meal.imageUrl} style={{width:'5rem', height:'5rem', objectFit: 'contain'}} className="img-fluid" alt="cool"/>
                </Link>
            </div>
            
            <div className="col-10 mx-auto col-lg-2">
            <Link to={'/meal/' + meal.mealId} key={meal.name} style={{textDecoration: 'none', color: 'black'}}>
                <span className="d-lg-none">
                    product :
                </span>
                {meal.name}
                </Link>
            </div>
            
            
            <div className="col-10 mx-auto col-lg-2">
            <Link to={'/meal/' + meal.mealId} key={meal.mealId} style={{textDecoration: 'none', color: 'black'}}>
                <span className="d-lg-none">
                    price :
                </span>
                <span>£</span>
                {meal.mealCost}
                </Link>
            </div>
            
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                        <span className="btn btn-black " onClick={(e)=>props.decreaseQuantity(e, meal)}>
                            -
                        </span>
                        <span className="btn btn-black mx-1">{meal.quantity}</span>
                        <span className="btn btn-black " onClick={(e)=>props.increaseQuantity(e, meal)}>
                            +
                        </span>
                    </div>
                    {/* <span>{meal.quantity}</span>*/}
                  </div>
            </div>
            <div className="cart-icon col-10 mx-auto col-lg-2 text-danger" style={{cursor:"pointer"}} onClick={handleOpen} >
              <RiDeleteBin6Line/>
            </div>
            <Modal
              aria-labelledby="spring-modal-title"
              aria-describedby="spring-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <h2 id="spring-modal-title">Delete Product</h2>
                  <p id="spring-modal-description">Are you sure you want to delete this product from your cart</p>
                  <hr/>
                  <Row>
                    <button className="btn ml-auto btn-outline-secondary text-uppercase mb-3 px-5" style={{ margin: '10px'}} type="button" onClick={handleClose}>Cancel</button>
                    <Link to="/cart"><button className="btn mr-auto btn-outline-danger text-uppercase mb-3 px-5" style={{ margin: '10px'}} type="button" onClick={()=>props.deleteCartMeal(meal.cartId)}>delete product</button></Link>
                  </Row>
                </div>
              </Fade>
            </Modal>
            <div className="col-10 mx-auto col-lg-2">
                <strong>
                    item total : £{meal.total}
                </strong>
            </div>
            <br/><br/><br/><br/><br/>
            {/* onClick={()=>props.deleteCartMeal(meal.cartId)} */}
        </div>
      <br/>
      {/* </Link> */}
    </div>
  )
}


export default Cart;