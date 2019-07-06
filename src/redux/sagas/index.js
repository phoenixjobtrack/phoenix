import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import requirementsSaga from './requirementsSaga';
import tasksSaga from './tasksSaga';
import userSaga from './userSaga';
import contactSaga from './contactSaga';
import jobSaga from './jobSaga';
import interviewStagesSaga from './interviewStagesSaga';
import jobRequirementsSaga from './jobRequirementsSaga';
import jobStagesSaga from './jobStagesSaga'


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    requirementsSaga(),
    tasksSaga(),
    userSaga(),
    contactSaga(),
    jobSaga(),
    interviewStagesSaga(),
    jobRequirementsSaga(),
    jobStagesSaga(),

  ]);
}
