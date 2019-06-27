const currentContactReducer = (state = {}, action) => {

    if (action.type === 'STORE_CURRENT_CONTACT') {
        return action.payload
    }
    else {
        return state;
    }

};



export default currentContactReducer;