const currentTasksReducer = (
  state = {
    0: {
      taskName: '',
      dueDate: '',
      note: '',
    },
  },
  action,
) => {
  if (action.type === 'UPDATE_REDUX_TASKS') {
    return {
      ...state,
      [action.payload.key]: {
        ...state[action.payload.key],
        [action.payload.prop]: action.payload.value,
      },
    }
  } else if (action.type === 'ADD_TO_REDUX_TASKS') {
    return {
      ...state,
      [Object.entries(state).length]: {
        taskName: '',
        dueDate: '',
        note: '',
      },
    }
  } else if (action.type === 'LOAD_TASKS') {
    let taskObject = state
    action.payload.map((job, i) => {
      taskObject = {
        ...taskObject,
        [i]: {
          taskName: job.taskName,
          dueDate: job.task_dueDate,
          note: job.task_note,
        },
      }
    })
    return taskObject
  } else if (action.type === 'REMOVE_TASK_FROM_REDUX') {
    let key = action.payload
    delete state[key]
    return state
  } else if (action.type === 'CLEAR_CURRENT_JOB') {
    return {
      0: {
        taskName: '',
        dueDate: '',
        note: '',
      },
    }
  } else {
    return state
  }
}

export default currentTasksReducer
