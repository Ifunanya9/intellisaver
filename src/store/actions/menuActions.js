export const createMenu = (menu) => {
    return(dispatch, getState,  {getFirebase} ) => {
        const profile = getState().firebase.profile;
        const authId = getState().firebase.auth.uid;
        getFirebase().firestore().collection('menus').add({
            connected: "true", //instantiates menu to datastore for creation of menu id to be included in menu properties.
        }).then((resp) => {
            return getFirebase().firestore().collection('menus').doc(resp.id).set({
                company: profile.company,
                menuName: menu.menuName,
                menuTime: menu.menuTime,
                menuDay: menu.menuDay,
                menuMeals: menu.menuMeals,
                menuId: resp.id,
                authId: authId,
                createdAt: new Date(),
                updatedAt: null
            })
        })
        .then(()=> {
            dispatch({type: 'CREATE_MENU', menu});          
        }).catch((err) => {
            dispatch({type: 'CREATE_MENU_ERROR', err});
        })
    }  
};

export const deleteMenu = (id) => {
    console.log(id);
    return(dispatch, getState, {getFirebase} ) => {
        getFirebase().firestore().collection('menu').doc(id).delete()
        .then(()=> {
            dispatch({type: 'DELETE_MENU'});          
        })
        .catch((err) => {
            dispatch({type: 'DELETE_MENU_ERROR', err});
        })
    }
} 
