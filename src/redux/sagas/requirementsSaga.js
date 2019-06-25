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

//SAGA to GET requirements from database (send user id as a query in URL)
function* fetchRequirements(action) {
    console.log('in fetchRequirements saga payload:', action.payload, 'user_id:', action.payload.user.id)
    try {
    
        const url = `/api/requirement?user_id=${action.payload.user.id}`
        const requirements = yield axios.get('api/requirement')
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