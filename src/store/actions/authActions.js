export const signIn = (credentials) => {
    return(dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        )
        .then(() => {
            dispatch({type: 'LOGIN_SUCCESS'})
        })
        .catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err});
        });
    }
}

export const signOut = () => {
    return(dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'});
        });
    }
}

export const signUp = (newUser) => {

    return (dispatch, getState, {getFirebase}) => {
        const fb = getFirebase();
        const fbStore = getFirebase().firestore();
        fb.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password,
        ).then((resp) => {
            return fbStore.collection('users').doc(resp.user.uid).set({
               firstName: newUser.firstName,
               lastName: newUser.lastName,
               contact: newUser.contact,
               category: 'customer',
               company: 'N/A',
               vehicleModel: 'N/A',
               vehicleColour: 'N/A',
               vehicleNumber: 'N/A',
               licenceNumber: 'N/A',
               address: newUser.address,
               city: newUser.city,
               postcode: newUser.postcode,
               initials: newUser.firstName[0] + newUser.lastName[0] 
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}

export const signUpDispacther = (newDispatcher) => {

    return (dispatch, getState, {getFirebase}) => {
        const fb = getFirebase();
        const fbStore = getFirebase().firestore();
        fb.auth().createUserWithEmailAndPassword(
            newDispatcher.email,
            newDispatcher.password,
        ).then((resp) => {
            return fbStore.collection('users').doc(resp.user.uid).set({
               firstName: newDispatcher.firstName,
               lastName: newDispatcher.lastName,
               contact: newDispatcher.contact,
               category: 'dispatcher',
               company: newDispatcher.company,
               vehicleModel: newDispatcher.vehicleModel,
               vehicleColour: newDispatcher.vehicleColour,
               vehicleNumber: newDispatcher.vehicleNumber,
               licenceNumber: newDispatcher.licenceNumber,
               address: newDispatcher.address,
               city: newDispatcher.city,
               postcode: newDispatcher.postcode,
               initials: newDispatcher.firstName[0] + newDispatcher.lastName[0] 
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}

export const signUpProvider = (newProvider) => {

    return (dispatch, getState, {getFirebase}) => {
        const fb = getFirebase();
        const fbStore = getFirebase().firestore();
        fb.auth().createUserWithEmailAndPassword(
            newProvider.email,
            newProvider.password,
        ).then((resp) => {
            return fbStore.collection('users').doc(resp.user.uid).set({
               firstName: newProvider.firstName,
               lastName: newProvider.lastName,
               contact: newProvider.contact,
               category: 'caterer',
               company: newProvider.company,
               vehicleModel: 'N/A',
               vehicleColour: 'N/A',
               vehicleNumber: 'N/A',
               licenceNumber: 'N/A',
               address: newProvider.address,
               city: newProvider.city,
               postcode: newProvider.postcode,
               initials: newProvider.firstName[0] + newProvider.lastName[0] 
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}