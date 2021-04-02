export const deleteCartMeal = (id) => {
    console.log(id);
    return(dispatch, getState, {getFirebase} ) => {
        getFirebase().firestore().collection('cart').doc(id).delete()
        .then(()=> {
            dispatch({type: 'DELETE_CART_MEAL'});          
        })
        .catch((err) => {
            dispatch({type: 'DELETE_CART_MEAL_ERROR', err});
        })
    }
} 

export const deleteCart = () => {
    return(dispatch, getState, {getFirebase} ) => {
        getFirebase().firestore().delete('cart')
        .then(()=> {
            dispatch({type: 'DELETE_CART_MEAL'});          
        })
        .catch((err) => {
            dispatch({type: 'DELETE_CART_MEAL_ERROR', err});
        })
    }
} 

export const addQuantity = (meal) => {
    console.log(meal);
    const quantity = meal.quantity;
    return(dispatch, getState, {getFirebase} ) => {
        getFirebase().firestore().collection('cart').doc(meal.cartId).update({
            updatedAt: new Date(),
            quantity: quantity + 1,
            total: meal.mealCost * (quantity + 1),
        })
        .then(()=> {
            dispatch({type: 'ADD_QUANTITY'});          
        })
        .catch((err) => {
            dispatch({type: 'ADD_QUANTITY_ERROR', err});
        })
    }
} 

export const lessQuantity = (meal) => {
    // console.log(id);
    const quantity = meal.quantity;
    return(dispatch, getState, {getFirebase} ) => {
        getFirebase().firestore().collection('cart').doc(meal.cartId).update({
            updatedAt: new Date(),
            quantity: quantity - 1,
            total: meal.mealCost * (quantity - 1),
        })
        .then(()=> {
            dispatch({type: 'LESS_QUANTITY'});          
        })
        .catch((err) => {
            dispatch({type: 'LESS_QUANTITY_ERROR', err});
        })
    }
} 

export const updateCartMeal = (cartMeal) => {
    return(dispatch, getState,  {getFirebase} ) => {
        getFirebase().firestore().collection('cart').doc(cartMeal).update({
                ...cartMeal,
               updatedAt: new Date()
        })
        .then(()=> {
            dispatch({type: 'UPDATE_CART_MEAL', cartMeal});          
        }).catch((err) => {
            dispatch({type: 'UPDATE_CART_MEAL_ERROR', err});
        })
    }  
};

export const addMealToCart = (meal) => {
    console.log(meal);
    return(dispatch, getState,  {getFirebase} ) => {
        const profile = getState().firebase.profile;
        const authId = getState().firebase.auth.uid;
        const quantity = 1
        getFirebase().firestore().collection('cart').add({
            connected: "true", //instantiates meal id to datastore for creation of cart id to be included in mail properties.
        }).then((resp) => {
            return getFirebase().firestore().collection('cart').doc(resp.id).set({
                ...meal,
                cartId: resp.id,
                userId: authId,
                addToCartAt: new Date(),
                updateCartAt: null,
                quantity: quantity,
                total: meal.mealCost * quantity,
            })
        })
        .then(()=> {
            dispatch({type: 'CREATE_CART_MEAL', meal});          
        }).catch((err) => {
            dispatch({type: 'CREATE_CART_MEAL_ERROR', err});
        })
    }  
};
// export const addMealToCart = (meal) => {
//     return(dispatch, getState, {getFirebase}) => {
//         // const firebase = ;
//         const authId = getState().firebase.auth.uid;

//         getFirebase().firestore().collection('mealsInCart').add({
//             userId: authId,
//             mealId: meal.id,
//             mealName: meal.name,
//             mealCost: meal.cost,
//             mealType: meal.type,
//             mealCategory: meal.category,
//             mealImg: meal.img,
//             quantity: meal.quantity
//         })
//         .then(()=> {
//             dispatch({type: 'ADD_MEAL_TO_CART', meal});          
//         }).catch((err) => {
//             dispatch({type: 'ADD_MEAL_TO_CART_ERROR', err});
//         })
//     }
// }

