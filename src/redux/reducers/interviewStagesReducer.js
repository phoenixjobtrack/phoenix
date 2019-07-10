const interviewStagesReducer = (state = [], action) => {
    if (action.type === 'STORE_INTERVIEW_STAGES') {
        return action.payload
    }
    else {
        return state;
    }
};



export default interviewStagesReducer;