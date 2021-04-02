const initState = {

    menu: []
}

const menuReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_MENU':
            console.log('created menu', action.menu);
            console.log(state);
            return state;
        case 'CREATE_MENU_ERROR': 
            console.log('create menu error', action.err);
            return state;
        case 'DELETE_MENU':
            console.log('Deleted menu');
            return state;
        case 'DELETE_MENU_ERROR':
            console.log('Delete menu error');
            return state;
        default: 
        return state; 
    }
}

export default menuReducer