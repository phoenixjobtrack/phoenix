import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* addRequirement(action) {
    console.log('in addRequirement saga', action.payload)
        
    try {
        yield action.payload.requirements.map(requirement=>{
            axios.post('api/requirement', {requirement: requirement})
        })
        
        
    } catch (error) {
        console.log('error in addRequirement saga', error);
    }
}

function* requirementsSaga() {
    yield takeEvery('REGISTER', addRequirement);
}

export default requirementsSaga;