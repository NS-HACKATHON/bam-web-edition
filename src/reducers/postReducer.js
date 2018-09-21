const postReducer = (state = {firstname: 'John Doe'}, action) => {
    switch(action.type) {
        case 'CHANGE_FIRST_NAME':
            return {
                firstname: action.payload
            };
        default:
            return state;
    }
}

export default postReducer;