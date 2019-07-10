import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// Used for adding additional requirements from the Profile View
function* addNewRequirement(action) {
    try {
        yield axios.post(`api/requirements`, action.payload )
        yield put({ type: 'FETCH_REQUIREMENTS' })
    } catch (error) {
        console.log('error in addNewRequirement saga', error);
    }
}

// worker Saga: will be fired on "FETCH_USER" actions
function* addRequirements(action) {
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
        yield put({type:'STORE_REQUIREMENTS', payload: requirements.data})
    }
    catch (error){
        console.log('in fetchRequirements saga', error)
    }
}

function* removeRequirement(action) {
    try {
        yield axios.delete(`api/requirements/${action.payload}`, action.payload)
        yield put({ type: 'FETCH_REQUIREMENTS'})
    } catch (error) {
        console.log('error in removeRequirement', error);
    }
}

// BE CAREFUL
// This is updateRequirement NOT updateRequirementS with an "S"
function* updateRequirement(action) {
    try {
        yield axios.put(`api/requirements/${action.payload.id}`, action.payload)
        yield put({type: 'FETCH_REQUIREMENTS' })
    } catch (error) {
        console.log('error in updateRequiremenT saga', error);
    }
}

// WATCH OUT
// This is updateRequirementS NOT updateRequirement NO "S"
function* updateRequirements(action) {
    try {
        yield action.payload.requirements.map(requirement=>{
            axios.put(`api/requirements/${action.payload.id}`, action.payload)
            put({ type: 'FETCH_REQUIREMENTS' })
        })       
    } catch (error) {
        console.log('error in updateRequirements saga', error);
    }
};

function* requirementsSaga() {
    yield takeEvery('ADD_REQUIREMENTS', addRequirements);
    yield takeEvery('ADD_NEW_REQUIREMENT', addNewRequirement);
    yield takeEvery('FETCH_REQUIREMENTS', fetchRequirements);
    yield takeEvery('REMOVE_REQUIREMENT', removeRequirement)
    yield takeEvery('UPDATE_REQUIREMENTS', updateRequirements);
    yield takeEvery('UPDATE_REQUIREMENT', updateRequirement);
}

export default requirementsSaga;