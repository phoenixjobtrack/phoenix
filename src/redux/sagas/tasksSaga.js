// ========== TASKS SAGA ========== //
import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'
import { apiUrl } from './apiUrl'

// Adds a task to the database "tasks" table
function* addTask(action) {
  // Do or Do Not. There is no
  try {
    yield axios.post(`${apiUrl}/api/tasks`, action.payload)
    yield put({ type: 'FETCH_TASKS' })
  } catch (error) {
    console.log('error in addTask saga', error)
  }
  yield put({ type: 'FETCH_TASKS_BY_DATE' })
}

// Adds a note to a task in the "tasks" table
function* addTaskNote(action) {
  try {
    yield axios.put(
      `${apiUrl}/api/tasks/note/${action.payload.note}/${action.payload.id}`,
      action.payload,
    )
    yield put({ type: 'FETCH_TASKS' })
  } catch (error) {
    console.log('error in addTaskNote', error)
  }
}

// Fetch all tasks from the database in the "tasks" table (sorted by id)
function* fetchTasks(action) {
  // Do or Do Not. There is no
  try {
    const tasks = yield axios.get(`${apiUrl}/api/tasks`, action.payload)
    yield put({ type: 'STORE_TASKS', payload: tasks.data })
  } catch (error) {
    console.log('error in fetchTasks saga', error)
  }
}

//fetch tasks sorted by date
function* fetchTasksByDate() {
  try {
    const tasks = yield axios.get(`${apiUrl}/api/tasks/date`)
    yield put({ type: 'STORE_TASKS_BY_DATE', payload: tasks.data })
  } catch (err) {
    console.log('error in fetchTasksByDate', err)
  }
}

// Removes note from a task in the the "tasks" table in the database at id of selected task
function* removeTaskNote(action) {
  try {
    yield axios.put(
      `${apiUrl}/api/tasks/note/${action.payload.note}/${action.payload.id}`,
      action.payload,
    )
    yield put({ type: 'FETCH_TASKS' })
  } catch (error) {
    console.log('error in removeTaskNote', error)
  }
}

// Removes task from the "tasks" table in the database at id of selected task
function* removeTask(action) {
  try {
    yield axios.delete(`${apiUrl}/api/tasks/${action.payload}`, action.payload)
    yield put({ type: 'FETCH_TASKS' })
  } catch (error) {
    console.log('error in removeTask saga', error)
  }
}

// Toggles the "complete" column boolean in the "tasks" table in the database at id of selected task
function* toggleTaskCheck(action) {
  try {
    yield axios.put(`${apiUrl}/api/tasks/${action.payload}`, action.payload)
    yield put({ type: 'FETCH_TASKS' })
  } catch (error) {
    console.log('error in toggleTaskCheck saga', error)
  }
}

function* updateTask(action) {
  try {
    yield axios.put(
      `${apiUrl}api/tasks/update/${action.payload.taskName}/${action.payload.id}/${action.payload.dueDate}`,
      action.payload,
    )
    yield put({ type: 'FETCH_TASKS' })
  } catch (error) {
    console.log('error in upateTask saga', error)
  }
}

// Watcher Saga
function* tasksSaga() {
  yield takeEvery('ADD_TASK', addTask)
  yield takeEvery('ADD_TASK_NOTE', addTaskNote)
  yield takeEvery('CHECK_TASK_BOX', toggleTaskCheck)
  yield takeEvery('FETCH_TASKS', fetchTasks)
  yield takeEvery('FETCH_TASKS_BY_DATE', fetchTasksByDate)
  yield takeEvery('REMOVE_TASK_NOTE', removeTaskNote)
  yield takeEvery('REMOVE_TASK', removeTask)
  yield takeEvery('UPDATE_TASK', updateTask)
}

export default tasksSaga
