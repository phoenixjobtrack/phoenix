const currentJobReducer = (state = [], action) => {

    if (action.type === 'STORE_CURRENT_JOB') {
        return action.payload
    }
    if (action.type === 'UPDATE_CURRENT_JOB') {
        return {
            ...state,
            [action.payload.key]: action.payload.value
        }
    }
    else {
        return state;
    }

};



export default currentJobReducer;