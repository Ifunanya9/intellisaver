const initState = {
    cart: []
}

const cartReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_CART_MEAL':
            console.log(state.cartMessage);
             console.log('created cart meal', action.cart);
             return state
         case 'CREATE_CART_MEAL_ERROR': 
             console.log('create cart meal error', action.err);
             return state
         case 'DELETE_CART_MEAL':
             console.log('Deleted cart meal');
             return state;
         case 'DELETE_CART_MEAL_ERROR':
             console.log('Delete cart meal error');
             return state;
         case 'UPDATE_CART_MEAL':
             console.log('Updated cart meal');
             return state;
         case 'UPDATE_CART_MEAL_ERROR':
             console.log('Update cart meal error');
             return state;
         case 'ADD_QUANTITY':
             console.log('quantity increaced');
             console.log(state);
         return state;
         case 'ADD_QUANTITY_ERROR': 
             console.log('quantity increace error', action.err);
         return state;
         case 'LESS_QUANTITY':
             console.log('quantity decreaced');
             console.log(state);
         return state;
         case 'LESS_QUANTITY_ERROR': 
             console.log('quantity decreace error', action.err);
         return state;
        default:
            return state;         
    }
}

export default cartReducer