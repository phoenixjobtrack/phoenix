import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchJobs(action) {
    console.log('in fetchjobss saga', action.payload)
    
    try {
        let allJobs = yield axios.get('/api/jobs')
        console.log('in fetchJobs saga', allJobs.data)
        yield put({type: 'STORE_JOBS', payload: allJobs.data})
        
    } catch (error) {
        console.log('error in fetchJobs saga', error);
    }
}

function* fetchJobStages(action) {
    let allJobs = yield axios.get('/api/jobs/opp')
    console.log('in fetchJobs saga', allJobs.data)
    yield put({ type: 'STORE_JOBS', payload: allJobs.data })
    yield put({ type: 'LOAD_STAGES', payload: allJobs.data })
}

function* addJob(action) {
    console.log('in addJob Saga', action.payload);
    // Do or Do Not. There is no
    try {
        yield axios.post('api/jobs', action.payload)
        yield put({ type: 'FETCH_JOBS'})

    } catch (error) {
        console.log('error in addJob saga', error);
    }
}

function* jobSaga() {
    yield takeEvery('FETCH_JOBS', fetchJobs);
    yield takeEvery('ADD_JOB', addJob);
    yield takeEvery('FETCH_JOB_STAGES', fetchJobStages)

}

export default jobSaga;