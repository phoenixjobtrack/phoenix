import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchContacts(action) {
    try {
        let allContacts = yield axios.get('/api/contact')
        yield put({type: 'STORE_CONTACTS', payload: allContacts.data})
        
    } catch (error) {
        console.log('error in fetchContacts saga', error);
    }
}

//retrieve info for selected contact
function* fetchCurrentContact(action) {
    try {
        let currentContact = yield axios.get(`/api/contact/current/${action.payload}`)
        yield put({type: 'STORE_CURRENT_CONTACT', payload: currentContact.data})
    }
    catch(err){
        console.log('error in fetchCurrentContact saga', err)
    }
}

function* submitContact(action){
    try{
        yield axios.post('/api/contact', action.payload)
    } catch(err) {
        console.log('error in submitContact saga', err)
    }
}

function* updateContact(action){
    try{
        let url = `/api/contact/${action.payload.id}`
        yield axios.put(url, action.payload)
    }
    catch(err){
        console.log('error in updateContact saga', err)
    }
}

function* contactSaga() {
    yield takeEvery('FETCH_CONTACTS', fetchContacts);
    yield takeEvery('SUBMIT_CONTACT', submitContact);
    yield takeEvery('FETCH_CURRENT_CONTACT', fetchCurrentContact)
    yield takeEvery('UPDATE_CONTACT', updateContact);
}

export default contactSaga;