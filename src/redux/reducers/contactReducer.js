
const contactReducer = (state = [], action) => {
    if (action.type ==='STORE_CONTACTS'){
        return action.payload
    }
    else{
        return state;
    }
    
};



export default contactReducer;