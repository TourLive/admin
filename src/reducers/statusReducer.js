import * as types from "../actions/actionTypes";

const initialState = {
    count: 0,
    data: []
};

const statusReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_GPXTRACKS:
            let status = false;
            if (action.data.length !== 0) {
                status = true;
            }
            const updated = state.data.map(item => {
               if (item.stageID === action.id) {
                   return {...item, status: status}
               }
               return item;
            });
            return {...state, data: updated};
        case types.SET_ALL_STAGES:
            return {...state, data: action.data, count: action.data.count};
        default:
            return state;
    }
};

export default statusReducer;