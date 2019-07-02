const jobRequirementsReducer = (state = [], action) => {

    if (action.type === 'STORE_JOB_REQUIREMENTS') {
        return action.payload
    }
    else {
        return state;
    }
};



export default jobRequirementsReducer;