import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* addTask(action) {
    console.log('in addTask Saga', action.payload)

    try {
        yield axios.post('api/tasks')

    } catch (error) {
        console.log('error in addTask saga', error);
    }
}

function* tasksSaga() {
    yield takeEvery('ADD_TASK', addTask);
}

export default tasksSaga;