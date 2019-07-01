import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//GET stages from database
function* fetchStages() {
    try {
        const stages = yield axios.get('/api/stages')
        console.log('in fetchStages saga', stages)
        yield put({ type: 'STORE_STAGES', payload: stages.data })
    }
    catch (error) {
        console.log('in fetchStages saga', error)
    }
}

function* stagesSaga() {
    yield takeEvery('FETCH_STAGES', fetchStages)
}

export default stagesSaga;