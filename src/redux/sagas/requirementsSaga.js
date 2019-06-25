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
};

//SAGA to GET requirements from database
function* fetchRequirements(action) {
    
    try {
        const requirements = yield axios.get('/api/requirement')
        console.log('in fetchRequirements saga', requirements)
        yield put({type:'STORE_REQUIREMENTS', payload: requirements.data})
    }
    catch (error){
        console.log('in fetchRequirements saga', error)
    }
}

function* requirementsSaga() {
    yield takeEvery('ADD_REQUIREMENTS', addRequirement);
    yield takeEvery('FETCH_REQUIREMENTS', fetchRequirements)
}

export default requirementsSaga;