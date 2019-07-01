const jobReducer = (state = [], action) => {
    // console.log('in contactReducer - state:', state);
    // console.log('in contactReducer - action:', action.payload);
    if (action.type ==='STORE_JOBS'){
        return action.payload
    }
    else{
        return state;
    }
    
};



export default jobReducer;