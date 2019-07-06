const currentRequirementsReducer = (state = {}, action) => {

    if (action.type === 'UPDATE_REDUX_REQUIREMENT') {
        console.log('UPDATE_REDUX_REQUIREMENT', action.payload)
        return {
            ...state,
            [action.payload.key]: {
                ...state[action.payload.key],
                requirement_id: action.payload.requirement_id,
                [action.payload.prop]: action.payload.value
            }
        }
    }
    else if (action.type === 'ADD_TO_REDUX_REQUIREMENT') {
        return {
            ...state,
            [Object.entries(state).length]: {
                id: '',
                job_id: '',
                requirement_id: '',
                requirement_offer: '',
                requirement_met: ''
            }
        }
    }
    else if (action.type === 'LOAD_REQUIREMENTS') {
        let requirementObject = state
        console.log('in currentRequirementsReducer', action.payload)
        action.payload.map((requirement, i) => {
            console.log('mapping in currentRequirementsReducer', requirement, i)
            requirementObject = {
                ...requirementObject,
                [i]: {
                    id: requirement.id,
                    job_id: requirement.job_id,
                    requirement_id: requirement.requirement_id,
                    requirement_offer: requirement.requirement_offer,
                    requirement_met: requirement.requirement_met
                }
            }
        })
        return requirementObject
    }
    else if (action.type =='CLEAR_CURRENT_JOB'){
        return {}
    }
    else {
        return state;
    }

};



export default currentRequirementsReducer;