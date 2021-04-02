const initState = {

    meals: [
        {id: '1', title: 'help  me', content: 'jeromeeeeeeeeeeee'},
        {id: '2', title: 'shout me', content: 'kreeeeeeeeeeeeee'},
        {id: '3', title: 'jump  me', content: 'meeeeeeeeeeeeeeeee'}
    ]
}

const mealReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_MEAL':
            console.log('created meal', action.meal);
            console.log(state);
            return state;
        case 'CREATE_MEAL_ERROR': 
            console.log('create meal error', action.err);
            return state;
        case 'DELETE_MEAL':
            console.log('Deleted meal');
            return state;
        case 'DELETE_IMAGE-ERROR':
            console.log('Deleted image');
            return state;
        case 'DELETE_MEAL_ERROR':
            console.log('Delete meal error');
            return state;
        default: 
        return state; 
    }
}

export default mealReducer