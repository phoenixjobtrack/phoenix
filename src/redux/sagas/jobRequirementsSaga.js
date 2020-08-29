import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import { apiUrl } from './apiUrl';

function* fetchJobRequirements(action) {
    try {
        const jobRequirements = yield axios.get(`${apiUrl}api/job_requirements`, action.payload)
        yield put({type: 'STORE_JOB_REQUIREMENTS', payload: jobRequirements.data})
    } catch (error) {
        console.log('error in fetchJobRequirements saga', error);
    }
}
function* jobRequirementsSaga() {
    yield takeEvery('FETCH_JOB_REQUIREMENTS', fetchJobRequirements)
}

export default jobRequirementsSaga;