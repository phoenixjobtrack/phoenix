// const sampleContactData=[
//     {
//         first: 'Andrew',
//         last: 'Christianson',
//         company: 'Target',
//         position: 'model',
//         email: 'ac@gmail.com',
//         phone: '555-5555',
//         cell: '666-6666',
//         linkedInUrl: 'linkedIn.com',
//         notes: 'went to college with Pete'
//     },
//     {
//         first: 'Andrew',
//         last: 'Christianson',
//         company: 'Target',
//         position: 'architect',
//         email: 'ac@gmail.com',
//         phone: '555-5555',
//         cell: '666-6666',
//         linkedInUrl: 'linkedIn.com',
//         notes: 'went to college with Pete'
//     },
//     {
//         first: 'Andrew',
//         last: 'Christianson',
//         company: 'Target',
//         position: 'hiring manager',
//         email: 'ac@gmail.com',
//         phone: '555-5555',
//         cell: '666-6666',
//         linkedInUrl: 'linkedIn.com',
//         notes: 'went to college with Pete'
//     },
//     {
//         first: 'Andrew',
//         last: 'Christianson',
//         company: 'Target',
//         position: 'boss',
//         email: 'ac@gmail.com',
//         phone: '555-5555',
//         cell: '666-6666',
//         linkedInUrl: 'linkedIn.com',
//         notes: 'went to college with Pete'
//     },
//     {
//         first: 'Bella',
//         last: 'Anderson',
//         company: 'Best Buy',
//         position: 'gardener',
//         email: 'ac@gmail.com',
//         phone: '555-5555',
//         cell: '666-6666',
//         linkedInUrl: 'linkedIn.com',
//         notes: 'went to college with Pete'
//     },
//     {
//         first: 'Christian',
//         last: 'Davenport',
//         company: '3M',
//         email: 'ac@gmail.com',
//         phone: '555-5555',
//         cell: '666-6666',
//         linkedInUrl: 'linkedIn.com',
//         notes: 'went to college with Pete'
//     },
//     {
//         first: 'Daria',
//         last: 'Edgerton',
//         company: 'Amazon',
//         email: 'ac@gmail.com',
//         phone: '555-5555',
//         cell: '666-6666',
//         linkedInUrl: 'linkedIn.com',
//         notes: 'went to college with Pete'
//     },
//     {
//         first: 'Ethan',
//         last: 'Brown',
//         company: 'Comcast',
//         email: 'ac@gmail.com',
//         phone: '555-5555',
//         cell: '666-6666',
//         linkedInUrl: 'linkedIn.com',
//         notes: 'went to college with Pete'
//     }
// ]

const contactReducer = (state = [], action) => {
    // console.log('in contactReducer - state:', state);
    // console.log('in contactReducer - action:', action.payload);
    if (action.type ==='STORE_CONTACTS'){
        return action.payload
    }
    else{
        return state;
    }

    //just for testing with dummy data, use the above code when the server stuff is set up
    // if (action.type==='SHOW_CONTACTS')
    //     return sampleContactData
    // else {
    //     return state
    // }
    
};



export default contactReducer;