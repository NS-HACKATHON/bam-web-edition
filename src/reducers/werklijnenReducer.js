const werklijnenReducer = (state = {werklijnen: []}, action) => {
    switch(action.type) {
        case 'UPDATE_WERKLIJNEN':
            return {
                werklijnen: action.payload
            };
        default:
            return state;
    }
}

export default werklijnenReducer;