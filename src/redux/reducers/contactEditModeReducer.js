const contactEditMode = (state = 'login', action) => {
    switch (action.type) {
        case 'SET_TO_EDIT_MODE':
            return 'login';
        case 'SET_TO_REGISTER_MODE':
            return 'register';
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.loginMode
export default contactEditMode;
