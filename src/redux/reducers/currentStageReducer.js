const currentStageReducer = (state = {0:{
    stage: '',
    note: '',
    date: ''
        }}, action) => {

    if (action.type === 'UPDATE_REDUX_STAGE') {
        return {
            ...state,
            [action.payload.key]: {
                ...state[action.payload.key],
                [action.payload.prop]: action.payload.value
            }
        }
    }
    else if (action.type === 'ADD_TO_REDUX_STAGE'){
        return{
            ...state,
            [Object.entries(state).length]: {
                stage: '',
                note: '',
                date: ''}
        }
    }
    else if (action.type==='LOAD_STAGES'){
        let stageObject = state
        action.payload.map((job,i)=>{
            stageObject = {
                ...stageObject,
                [i]: {
                    stage: job.stage,
                    note: job.stage_note,
                    date: job.stage_date
                }
            }
        })
        return stageObject
    }
    else if (action.type ==='REMOVE_STAGE_FROM_REDUX'){
        let key = action.payload
        delete state[key]

        return state
    }
    else if (action.type === 'CLEAR_CURRENT_JOB'){
        return {
            0: {
                stage: '',
                note: '',
                date: ''
            }
        }
    }
    else {
        return state;
    }

};



export default currentStageReducer;