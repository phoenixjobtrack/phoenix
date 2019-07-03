const currentJobReducer = (state = [], action) => {

    if (action.type === 'STORE_CURRENT_JOB') {
        return action.payload
    }
    else {
        return state;
    }

};



export default currentJobReducer;