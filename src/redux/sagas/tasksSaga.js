import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// Adds a task to the database "tasks" table
function* addTask(action) {
    console.log('in addTask Saga', action.payload);
    // Do or Do Not. There is no
    try {
        yield axios.post('api/tasks', action.payload)
        yield put({ type: 'FETCH_TASKS'})

    } catch (error) {
        console.log('error in addTask saga', error);
    }
}

// Fetch all tasks from the database in the "tasks" table
function* fetchTasks(action) {
    console.log('in fetchTasks Saga', action.payload);
    // Do or Do Not. There is no
    try {
        const tasks = yield axios.get('api/tasks', action.payload)
        yield put({type: 'STORE_TASKS', payload: tasks.data})
    } catch (error) {
        console.log('error in fetchTasks saga', error);
    }
}

function* toggleTaskCheck(action) {
    console.log('in toggleTaskCheck', action.payload);
    try {
        yield axios.put(`api/tasks/${action.payload}`, action.payload)
        yield put({ type: 'FETCH_TASKS' })
    } catch (error) {
        console.log('error in toggleTaskCheck saga', error);
    }
}

function* tasksSaga() {
    yield takeEvery('ADD_TASK', addTask);
    yield takeEvery('FETCH_TASKS', fetchTasks);
    yield takeEvery('CHECK_TASK_BOX', toggleTaskCheck);
}

export default tasksSaga;