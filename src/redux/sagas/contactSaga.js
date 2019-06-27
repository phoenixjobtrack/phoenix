import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchContacts(action) {
    console.log('in fetchContacts saga', action.payload)
    
    try {
        let allContacts = yield axios.get('/api/contact')
        console.log('in fetchContacts saga', allContacts.data)
        yield put({type: 'STORE_CONTACTS', payload: allContacts.data})
        
    } catch (error) {
        console.log('error in fetchContacts saga', error);
    }
}

function* contactSaga() {
    yield takeEvery('FETCH_CONTACTS', fetchContacts);
}

export default contactSaga;