const currentRequirementsReducer = (state = {}, action) => {
  if (action.type === 'UPDATE_REDUX_REQUIREMENT') {
    return {
      ...state,
      [action.payload.key]: {
        ...state[action.payload.key],
        requirementId: action.payload.requirementId,
        [action.payload.prop]: action.payload.value,
      },
    }
  } else if (action.type === 'ADD_TO_REDUX_REQUIREMENT') {
    return {
      ...state,
      [Object.entries(state).length]: {
        id: '',
        jobId: '',
        requirementId: '',
        requirementOffer: '',
        requirementMet: '',
      },
    }
  } else if (action.type === 'LOAD_REQUIREMENTS') {
    let requirementObject = state
    action.payload.map((requirement, i) => {
      requirementObject = {
        ...requirementObject,
        [i]: {
          id: requirement.id,
          jobId: requirement.jobId,
          requirementId: requirement.requirementId,
          requirementOffer: requirement.requirementOffer,
          requirementMet: requirement.requirementMet,
        },
      }
    })
    return requirementObject
  } else if (action.type == 'CLEAR_CURRENT_JOB') {
    return {}
  } else {
    return state
  }
}

export default currentRequirementsReducer
