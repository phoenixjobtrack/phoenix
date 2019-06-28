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

function* jobSaga() {
    yield takeEvery('FETCH_JOBS', fetchJobs);
}

export default jobSaga;