// ========== TASKS BY DATE REDUCER ========== //
// All Tasks Funnel To This Reducer
const tasksByDate = (state = [], action) => {
    if (action.type ==='STORE_TASKS_BY_DATE'){
        return action.payload
    }
    else {
        return state;
    }
};

export default tasksByDate;