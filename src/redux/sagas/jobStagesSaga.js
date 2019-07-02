import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchJobStages() {
    // const allStages = yield axios.get('/api/')
}

function* jobStagesSaga() {
    yield takeEvery('FETCH_JOB_STAGES', fetchJobStages);


}

export default jobStagesSaga;