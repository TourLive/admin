import * as types from "../actions/actionTypes";

const initialState = {
    raceID : ""
};

const cnlabReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_CNLAB_DATA:
            return {...state, raceID: action.data};
        default:
            return state;
    }
}

export default cnlabReducer;