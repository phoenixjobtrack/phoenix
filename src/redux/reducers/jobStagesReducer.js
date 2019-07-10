const jobStagesReducer = (state = [], action) => {
    if (action.type === 'STORE_JOB_STAGES') {
        return action.payload
    }
    else {
        return state;
    }

};



export default jobStagesReducer;