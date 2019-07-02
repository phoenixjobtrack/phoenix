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
            [action.payload.key]: {
                stage: '',
                note: '',
                date: ''}
        }
    }
    else if (action.type==='LOAD_STAGES'){
        let stageObject = state
        console.log('in currentStageReducer', action.payload)
        action.payload.map((job,i)=>{
            console.log('mapping in currentStageReducer', job, i)
            stageObject = {
                ...stageObject,
                [i]: {
                    stage: job.stage,
                    note: job.note,
                    date: job.date
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
    else if (action.type ==='REMOVE_STAGE_FROM_REDUX'){
        console.log('in REMOVE_STAGE_FROM_REDUX', action.payload)
        let key = action.payload
        delete state[key]

        return state
    }
    else {
        return state;
    }

};



export default currentStageReducer;