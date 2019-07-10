const currentContactReducer = (state = [], action) => {
    if (action.type === 'STORE_CURRENT_CONTACT') {
        return action.payload[0]
    }
    else if (action.type === 'UPDATE_REDUX_CONTACT') {
        return {
            ...state,
            [action.payload.key]: action.payload.value
        }
    }
    else {
        return state;
    }

};



export default currentContactReducer;