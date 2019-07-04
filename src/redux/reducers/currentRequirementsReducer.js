const currentRequirementsReducer = (state = {
    0: {
        requirement_id: '',
        requirement_offer: '',
        requirement_met: ''
    }
}, action) => {

    if (action.type === 'UPDATE_REDUX_REQUIREMENT') {
        console.log('UPDATE_REDUX_REQUIREMENT', action.payload)
        return {
            ...state,
            [action.payload.key]: {
                ...state[action.payload.key],
                [action.payload.prop]: action.payload.value
            }
        }
    }
    else if (action.type === 'ADD_TO_REDUX_REQUIREMENT') {
        return {
            ...state,
            [Object.entries(state).length]: {
                requirement_id: '',
                requirement_offer: '',
                requirement_met: ''
            }
        }
    }
    else if (action.type === 'LOAD_REQUIREMENTS') {
        let stageObject = state
        console.log('in currentRequirementsReducer', action.payload)
        action.payload.map((job, i) => {
            console.log('mapping in currentRequirementsReducer', job, i)
            stageObject = {
                ...stageObject,
                [i]: {
                    job_id: job.job_id,
                    requirement_id: job.requirement_id,
                    requirement_offer: job.requirement_offer,
                    requirement_met: job.requirement_met
                }
            }
        })
        return stageObject
        // {
        //     ...state,
        //     []:{

        //     }
        // }
    }
    else if (action.type === 'REMOVE_STAGE_FROM_REDUX') {
        console.log('in REMOVE_STAGE_FROM_REDUX', action.payload)
        let key = action.payload
        delete state[key]

        return state
    }
    else {
        return state;
    }

};



export default currentRequirementsReducer;