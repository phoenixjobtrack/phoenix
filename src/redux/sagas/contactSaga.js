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

function* submitContact(action){
    console.log('in submitContact', action.payload)
    try{
        yield axios.post('/api/contact', action.payload)
    } catch(err) {
        console.log('error in submitContact saga', err)
    }
}

function* updateContact(action){
    try{
        console.log('in updateContact saga', action.payload)
        let url = `/api/contact/${action.payload.contact_id}`
        yield axios.put(url, action.payload)
    }
    catch(err){
        console.log('error in updateContact saga', err)
    }
}

function* contactSaga() {
    yield takeEvery('FETCH_CONTACTS', fetchContacts);
    yield takeEvery('SUBMIT_CONTACT', submitContact);
    yield takeEvery('UPDATE_CONTACT', updateContact)
}

export default contactSaga;