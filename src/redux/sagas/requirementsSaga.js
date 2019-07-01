import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* addRequirements(action) {
    console.log('in addRequirements saga', action.payload)
        
    try {
        yield action.payload.requirements.map(requirement=>{
            axios.post('api/requirements', {requirement: requirement})
        })       
        
    } catch (error) {
        console.log('error in addRequirements saga', error);
    }
};

//SAGA to GET requirements from database
function* fetchRequirements(action) {
    
    try {
        const requirements = yield axios.get('/api/requirements')
        console.log('in fetchRequirements saga', requirements)
        yield put({type:'STORE_REQUIREMENTS', payload: requirements.data})
    }
    catch (error){
        console.log('in fetchRequirements saga', error)
    }
}

function* requirementsSaga() {
    yield takeEvery('ADD_REQUIREMENTS', addRequirements);
    yield takeEvery('FETCH_REQUIREMENTS', fetchRequirements)
}

export default requirementsSaga;