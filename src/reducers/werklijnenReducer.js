const werklijnenReducer = (state = {werklijnen: [], defecten: []}, action) => {
    switch(action.type) {
        case 'UPDATE_WERKLIJNEN':
            return {
                ...state,
                werklijnen: action.payload
            };
        case 'UPDATE_DEFECTEN':
            return {
                ...state,
                defecten: updateDefecten(state, action)
            };
        default:
            return state;
    }
}
export default werklijnenReducer;

const updateDefecten = (state, action) => {
    return state.defecten
        .filter(d => !hasId(action.payload, d.id))
        .concat(action.payload);
}

const hasId = (array, id) => {
    if (!id) return false
    if (!array) return false
    return array.filter(d => d.id === id).length > 0
}
