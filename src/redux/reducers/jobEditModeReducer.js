const jobEditMode = (state = 'edit', action) => {
    switch (action.type) {
        case 'SET_TO_EDIT_MODE':
            return 'edit';
        case 'SET_TO_CREATE_MODE':
            return 'create';
        default:
            return state;
    }
};


export default jobEditMode;
