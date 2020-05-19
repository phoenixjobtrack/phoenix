import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import { apiUrl } from './apiUrl';

//GET stages from database
function* fetchInterviewStages() {
    try {
        const stages = yield axios.get(`${apiUrl}/api/interviewStages`)
        yield put({ type: 'STORE_INTERVIEW_STAGES', payload: stages.data })
    }
    catch (error) {
        console.log('in fetchStages saga', error)
    }
}

function* interviewStagesSaga() {
    yield takeEvery('FETCH_INTERVIEW_STAGES', fetchInterviewStages)
}

export default interviewStagesSaga;