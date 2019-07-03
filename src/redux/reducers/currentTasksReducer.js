const currentTasksReducer = (state = {
    0: {
        task_name: '',
        due_date: '',
        note: ''
    }
}, action) => {

    if (action.type === 'UPDATE_REDUX_TASKS') {
        return {
            ...state,
            [action.payload.key]: {
                ...state[action.payload.key],
                [action.payload.prop]: action.payload.value
            }
        }
    }
    else if (action.type === 'ADD_TO_REDUX_TASKS') {
        return {
            ...state,
            [Object.entries(state).length]: {
                task_name: '',
                due_date: '',
                note: ''
            }
        }
    }
    else if (action.type === 'LOAD_TASKS') {
        let stageObject = state
        console.log('in currentTasksReducer', action.payload)
        action.payload.map((job, i) => {
            console.log('mapping in currentTasksReducer', job, i)
            stageObject = {
                ...stageObject,
                [i]: {
                    task_name: job.stage,
                    due_date: job.note,
                    note: job.date
                }
            }
        })
        return stageObject
    }
    else if (action.type === 'REMOVE_TASK_FROM_REDUX') {
        console.log('in REMOVE_TASK_FROM_REDUX', action.payload)
        let key = action.payload
        delete state[key]
        return state
    }
    else {
        return state;
    }
};



export default currentTasksReducer;