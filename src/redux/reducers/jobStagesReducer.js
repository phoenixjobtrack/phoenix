const jobStagesReducer = (state = [], action) => {
    // console.log('in contactReducer - state:', state);
    // console.log('in contactReducer - action:', action.payload);
    if (action.type === 'STORE_JOB_STAGES') {
        return action.payload
    }
    else {
        return state;
    }

};



export default jobStagesReducer;