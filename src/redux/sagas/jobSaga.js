import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* deactivateJob(action) {
    console.log('in deactivateJobSaga', action.payload);
    try {
        yield axios.put(`/api/jobs/deactivate/${action.payload}`)
        yield put({type: 'FETCH_JOBS'})
    }
    catch (error) {
        console.log('error in deactivateJob', error);
    }
    
}

function* fetchJobs(action) {
    try {
        let allJobs = yield axios.get('/api/jobs')
        yield put({type: 'STORE_JOBS', payload: allJobs.data})
        
    } catch (error) {
        console.log('error in fetchJobs saga', error);
    }
}

function* fetchJobStages(action) {
    let allJobStages = yield axios.get('/api/jobs/stages')
    let currentStages = []
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
    allJobTasks.data.map(task=>{
        if (task.job_id == action.payload){
            currentTasks = [...currentTasks, task]
        }
    })
    yield put({type: 'LOAD_TASKS', payload: currentTasks})
}

function* addJob(action) {
    try {
        //create job with job data
        yield axios.post('/api/jobs', action.payload.job)
        //create stages for new job
        yield Object.values(action.payload.stages).map(stage => {
            //filter out blank stages
            if (stage.stage){
                axios.post('/api/jobs/stages/new', stage)
            }
        })
        
        //create tasks for new job
        yield Object.values(action.payload.tasks).map(task=>{
            //filter out blank tasks
            if (task.due_date){
                axios.post('/api/jobs/tasks/new', task)
            }  
        })
        //create new requirements assessment for new job
        yield Object.values(action.payload.requirements).map(requirement=>{
            axios.post('/api/job_requirements', requirement)
        })
        yield put({type: 'FETCH_JOBS'})
        yield put({type: 'CLEAR_CURRENT_JOB'})
        

    } catch (error) {
        console.log('error in addJob saga', error);
    }
    yield put({ type: 'FETCH_JOB_STAGES' })
    yield put({ type: 'CLEAR_CURRENT_JOB' })
}

function* fetchCurrentJob(action) {
    let allJobs = yield axios.get('/api/jobs/stages')
    let currentJob
    
    allJobs.data.map(job=>{
        if (job.job_id == action.payload) {
            currentJob = job
            
        }
        
    })
    if (currentJob){
        yield put({ type: 'STORE_CURRENT_JOB', payload: currentJob })
    }
    
}

function* fetchJobRequirements(action) {
    try {
        const jobRequirements = yield axios.get('api/job_requirements', action.payload)
        let currentRequirements = []
        yield put({ type: 'STORE_JOB_REQUIREMENTS', payload: jobRequirements.data })
        jobRequirements.data.map(requirement => {
            if (requirement.job_id == action.payload) {
                currentRequirements = [...currentRequirements, requirement]
            }
        })
        yield put({ type: 'LOAD_REQUIREMENTS', payload: currentRequirements})
    } catch (error) {
        console.log('error in fetchJobRequirements saga', error);
    }

}

function* saveJobUpdates(action){
    try{
        //send job data
        yield axios.put('/api/jobs', action.payload.job)
        //delete stages associated with job before adding all from redux
        yield axios.delete(`/api/jobs/stages/${action.payload.job.job_id}`)
        //send stage data
        yield Object.entries(action.payload.stages).map(stage => {
            axios.post('/api/jobs/stages', { stage: stage, job_id: action.payload.job.job_id })
        })
        //delete tasks associated with job before adding all from redux
        yield axios.delete(`api/jobs/tasks/${action.payload.job.job_id}`)
        // send task data
        yield Object.entries(action.payload.tasks).map(task => {
            if (task.due_date) {
                axios.post('/api/jobs/tasks', { task: task, job_id: action.payload.job.job_id })
            }
            
        })
        // //delete requirements assessments associated with job before adding all from redux
        //send requirement assessment data
        yield Object.entries(action.payload.requirements).map(requirement => {
            axios.put('/api/jobs/requirements', requirement)
        })
        yield put({ type: 'CLEAR_CURRENT_JOB' })
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
    yield takeEvery('DEACTIVATE_JOB', deactivateJob)

}

export default jobSaga;
