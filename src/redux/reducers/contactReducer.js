const contactReducer = (state = [], action) => {
    console.log('in contactReducer - state:', state);
    console.log('in contactReducer - action:', action);
    if (action.type ==='STORE_CONTACTS'){
        return action.payload
    }
    else{
        return state;
    }
    
};



export default contactReducer;