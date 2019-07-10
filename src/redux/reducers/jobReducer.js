const jobReducer = (state = [], action) => {
    if (action.type ==='STORE_JOBS'){
        return action.payload
    }
    else{
        return state;
    }
    
};



export default jobReducer;