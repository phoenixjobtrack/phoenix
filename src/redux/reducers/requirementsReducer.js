const requirementsReducer = (state = [], action) => {
    if (action.type ==='STORE_REQUIREMENTS'){
        return action.payload
    }
    else {
        return state;
    }
    
};



export default requirementsReducer;