import authReducer from './authReducer';
import mealReducer from './mealReducer';
import menuReducer from './menuReducer';
import cartReducer from './cartReducer';
import { firestoreReducer } from 'redux-firestore'
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    meal: mealReducer,
    menu: menuReducer,
    cart: cartReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

export default rootReducer;
