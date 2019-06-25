import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchContacts(action) {
    console.log('in fetchContacts saga', action.payload)

    try {
        


    } catch (error) {
        console.log('error in addRequirement saga', error);
    }
}

function* contactSaga() {
    yield takeEvery('FETCH_CONTACTS', fetchContacts);
}

export default contactSaga;