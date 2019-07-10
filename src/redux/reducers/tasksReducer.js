// ========== TASKS REDUCER ========== //
// All Tasks Funnel To This Reducer
const tasksReducer = (state = [], action) => {
    if (action.type ==='STORE_TASKS'){
        return action.payload
    }
    else {
        return state;
    }
};

export default tasksReducer;