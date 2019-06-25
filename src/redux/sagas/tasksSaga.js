import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* addTask(action) {
    console.log('in addTask Saga', action.payload)

    try {
        yield action.payload.requirements.map(requirement => {
            axios.post('api/requirement', { requirement: requirement })
        })


    } catch (error) {
        console.log('error in addRequirement saga', error);
    }
}

function* tasksSaga() {
    yield takeEvery('ADD_TASK', addTask);
}

export default tasksSaga;