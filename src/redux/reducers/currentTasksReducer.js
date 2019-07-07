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
        let taskObject = state
        console.log('in currentTasksReducer', action.payload)
        action.payload.map((job, i) => {
            console.log('mapping in currentTasksReducer', job, i)
            taskObject = {
                ...taskObject,
                [i]: {
                    task_name: job.task_name,
                    due_date: job.task_due_date,
                    note: job.task_note
                }
            }
        })
        return taskObject
    }
    else if (action.type === 'REMOVE_TASK_FROM_REDUX') {
        console.log('in REMOVE_TASK_FROM_REDUX', action.payload)
        let key = action.payload
        delete state[key]
        return state
    }
    else if (action.type === 'CLEAR_CURRENT_JOB') {
        return {
            0: {
                task_name: '',
                due_date: '',
                note: ''
            }
        }
    }
    else {
        return state;
    }
};



export default currentTasksReducer;