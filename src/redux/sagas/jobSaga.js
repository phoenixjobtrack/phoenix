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
    let allJobStages = yield axios.get('/api/jobs/stages')
    let currentStages = []
    console.log('in fetchJobs saga', allJobStages.data, action.payload)
    yield put({type:'STORE_JOBS', payload: allJobStages.data})
    yield put({ type: 'STORE_JOB_STAGES', payload: allJobStages.data })
    allJobStages.data.map(stage=>{
        if(stage.job_id==action.payload){
            currentStages = [...currentStages, stage]
        }
    })
    yield put({ type: 'LOAD_STAGES', payload: currentStages })
}

function* fetchJobTasks(action){
    
    let allJobTasks = yield axios.get('/api/jobs/tasks')
    let currentTasks = []
    console.log('in fetchJobStages saga', allJobTasks.data)
    allJobTasks.data.map(task=>{
        if (task.job_id == action.payload){
            currentTasks = [...currentTasks, task]
        }
    })
    console.log('tasks for reducer', currentTasks)
    yield put({type: 'LOAD_TASKS', payload: currentTasks})
}

function* addJob(action) {
    console.log('in addJob Saga', action.payload);
    // Do or Do Not. There is no
    try {
        yield axios.post('/api/jobs', action.payload)
        yield put({ type: 'FETCH_JOBS'})

    } catch (error) {
        console.log('error in addJob saga', error);
    }
}

function* fetchCurrentJob(action) {
    let allJobs = yield axios.get('/api/jobs/stages')
    let currentJob
    console.log('fetchCurrentJob', allJobs ,action.payload)
    allJobs.data.map(job=>{
        if (job.job_id == action.payload) {
            console.log('in fetchCurrentJobSaga', job.job_id, action.payload)
            currentJob = job
            
        }
        
    })
    if (currentJob){
        yield put({ type: 'STORE_CURRENT_JOB', payload: currentJob })
    }
    
}

function* fetchJobRequirements(action) {
    console.log('in fetchJobRequirements Saga', action.payload);
    try {
        const jobRequirements = yield axios.get('api/job_requirements', action.payload)
        let currentRequirements = []
        yield put({ type: 'STORE_JOB_REQUIREMENTS', payload: jobRequirements.data })
        console.log('fetchJobRequirements saga', jobRequirements.data)
        jobRequirements.data.map(requirement => {
            if (requirement.job_id == action.payload) {
                currentRequirements = [...currentRequirements, requirement]
            }
        })
        console.log('requirements for reducer', currentRequirements)
        yield put({ type: 'LOAD_REQUIREMENTS', payload: currentRequirements})
    } catch (error) {
        console.log('error in fetchJobRequirements saga', error);
    }

}

function* saveJobUpdates(action){
    console.log('in saveJobUpdates', action.payload)
    
    try{
        // console.log('in saveJobUpdates', action.payload.job)
        //send job data
        yield axios.put('/api/jobs', action.payload.job)
        //delete stages associated with job before adding all from redux
        yield axios.delete(`/api/jobs/stages/${action.payload.job.job_id}`)
        //send stage data
        yield Object.entries(action.payload.stages).map(stage => {
            console.log('in saveJobUpdates saga stage:', stage, action.payload.job.job_id)
            axios.post('/api/jobs/stages', { stage: stage, job_id: action.payload.job.job_id })
        })
        //delete tasks associated with job before adding all from redux
        yield axios.delete(`api/jobs/tasks/${action.payload.job.job_id}`)
        // send task data
        yield Object.entries(action.payload.tasks).map(task => {
            console.log('in saveJobUpdates saga task:', task)
            axios.put('/api/jobs/tasks', {task: task, job_id: action.payload.job.job_id})
        })
        //send requirement assessment data
        yield Object.entries(action.payload.requirements).map(requirement => {
            console.log('in saveJobUpdates saga requirement:', requirement)
            axios.put('/api/jobs/requirements', requirement)
        })
    }
    catch(err) {
        console.log('error in PUT /api/jobs', err)
    }
    
    
    
    

}

function* jobSaga() {
    yield takeEvery('FETCH_JOBS', fetchJobs);
    yield takeEvery('ADD_JOB', addJob);
    yield takeEvery('FETCH_JOB_STAGES', fetchJobStages)
    yield takeEvery('FETCH_CURRENT_JOB', fetchCurrentJob)
    yield takeEvery('FETCH_JOB_TASKS', fetchJobTasks)
    yield takeEvery('SAVE_JOB_UPDATES', saveJobUpdates)
    yield takeEvery('FETCH_JOB_REQUIREMENTS', fetchJobRequirements)

}

export default jobSaga;
