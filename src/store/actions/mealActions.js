export const deleteMeal = (id) => {
    console.log(id);
    return(dispatch, getState, {getFirebase} ) => {
        getFirebase().firestore().collection('meals').doc(id).delete()
        .then(()=> {
            dispatch({type: 'DELETE_MEAL'});          
        })
        .catch((err) => {
            dispatch({type: 'DELETE_MEAL_ERROR', err});
        })
    }
} 

export const updateMeal = (meal) => {
    return(dispatch, getState,  {getFirebase} ) => {
        getFirebase().firestore().collection('meals').doc(meal).update({
                ...meal,
               updatedAt: new Date()
        })
        .then(()=> {
            dispatch({type: 'UPDATE_MEAL', meal});          
        }).catch((err) => {
            dispatch({type: 'UPDATE_MEAL_ERROR', err});
        })
    }  
};


export const deleteImage = (url) => {
    console.log(url);
    return(dispatch, getState, {getFirebase} ) => {
        getFirebase().storage().ref().child(url).delete()
        .then(()=> {
            dispatch({type: 'DELETE_IMAGE'});          
        })
        .catch((err) => {
            dispatch({type: 'DELETE_IMAGE_ERROR', err});
        })
    }
} 

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

export const createMeal = (meal) => {
    return(dispatch, getState,  {getFirebase} ) => {
        const profile = getState().firebase.profile;
        const authId = getState().firebase.auth.uid;
        getFirebase().firestore().collection('meals').add({
            connected: "true", //instantiates meal to datastore for creation of meal id to be included in mail properties.
        }).then((resp) => {
            return getFirebase().firestore().collection('meals').doc(resp.id).set({
                authorFirstName: profile.firstName,
                company: profile.company,
                name: meal.name,
                description: meal.description,
                mealType: meal.mealType,
                mealCategory: meal.mealCategory,
                mealCost: meal.mealCost,
                imageUrl: meal.imageUrl,
                mealId: resp.id,
                authId: authId,
                createdAt: new Date(),
                updatedAt: null
            })
        })
        .then(()=> {
            dispatch({type: 'CREATE_MEAL', meal});          
        }).catch((err) => {
            dispatch({type: 'CREATE_MEAL_ERROR', err});
        })
    }  
};



// export const createMeal = (meal) => {
//     return(dispatch, getState,  {getFirebase} ) => {
//         //make async call to database
//         //go ahead to dispatch the action again
//         // const firestore = getFirestore();
//         // const profile = getState().firebase.profile;
//         const authId = getState().firebase.auth.uid;
//         getFirebase().firestore().collection('meals').add({
//             // ...meal,
//             // createdBy: profile.provider,
//             // authorFirstName: profile.firstName,
//             // authorLastName: profile.lastName,
//             connected: "true", //instantistes meal to create meal id
//         }).then((resp) => {
//             return getFirebase().firestore().collection('meals').doc(resp.id).set({
//                 ...meal,
//                id: resp.id,
//                authId: authId,
//                createdAt: new Date()
//             })
//         })
//         .then(()=> {
//             dispatch({type: 'CREATE_MEAL', meal});          
//         }).catch((err) => {
//             dispatch({type: 'CREATE_MEAL_ERROR', err});
//         })
//     }  
// };