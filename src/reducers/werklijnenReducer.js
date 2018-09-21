const werklijnenReducer = (state = {werklijnen: [], defecten: [
    {
      id: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
      soort: "inzetbaar",
      beginTijd: "2020-01-01T00:11",
      eindTijd: null,
      toelichting: "Deze eenheid gaat over ruim een jaar gewoon kapot!",
      naInzet: {
        naam: "3310-V",
        dienstregelpunt: "Ut"
      }
    },
    {
      id: "11111111-2222-3333-4444-5555555555555",
      soort: "beperkt inzetbaar",
      beginTijd: "2018-01-01T00:11",
      eindTijd: "2020-01-01T00:11",
      toelichting: "De monteur heeft het zo druk...",
      naInzet: null
    },
    {
      id: "66666666-7777-8888-9999-0000000000000",
      soort: "niet inzetbaar",
      beginTijd: "2018-01-01T00:11",
      eindTijd: "2020-01-01T00:11",
      toelichting: "De monteur heeft het zo druk...",
      naInzet: null
    }
  ]}, action) => {
    switch(action.type) {
        case 'UPDATE_WERKLIJNEN':
            return {
                ...state,
                werklijnen: action.payload
            };
        case 'UPDATE_DEFECTEN':
            return {
                ...state,
                defecten: updateDefecten(state, action.payload)
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
    return array.filter(d => d.id === id).length > 0
}
