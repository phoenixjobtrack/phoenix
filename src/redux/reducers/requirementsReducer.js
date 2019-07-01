const requirementsReducer = (state = [], action) => {
    // console.log('in requirementReducer - state:', state);
    // console.log('in requirementReducer - action:', action);
    if (action.type ==='STORE_REQUIREMENTS'){
        return action.payload
    }
    else {
        return state;
    }
    
};



export default requirementsReducer;