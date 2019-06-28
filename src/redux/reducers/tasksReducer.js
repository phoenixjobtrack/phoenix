// All Tasks Funnel To This Reducer
const tasksReducer = (state = [], action) => {
    // console.log('in tasksReducer - state:', state);
    // console.log('in tasksReducer - action:', action);
    if (action.type ==='STORE_TASKS'){
        return action.payload
    }
    else {
        return state;
    }
};

export default tasksReducer;