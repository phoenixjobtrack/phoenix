import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchJobRequirements(action) {
    console.log('in fetchJobRequirements Saga', action.payload);
    try {
        const jobRequirements = yield axios.get('api/job_requirements', action.payload)
        yield put({type: 'STORE_JOB_REQUIREMENTS', payload: jobRequirements.data})
    } catch (error) {
        console.log('error in fetchJobRequirements saga', error);
    }
}

function* addJobRequirements() {
    try {
        const jobRequirements = yield axios.post('/api/job_requirements')
        console.log('addJobRequirements', jobRequirements)
        yield put({ type: 'FETCH_JOB_REQUIREMENTS', payload: jobRequirements.data })
    }
    catch (error) {
        console.log('in fetchJobRequirements saga', error)
    }
}

function* jobRequirementsSaga() {
    yield takeEvery('FETCH_JOB_REQUIREMENTS', fetchJobRequirements)
    yield takeEvery('ADD_JOB_REQUIREMENTS', addJobRequirements)
}

export default jobRequirementsSaga;