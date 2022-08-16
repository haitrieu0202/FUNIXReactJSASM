import * as ActionTypes from "./ActionTypes.js";

export const Staffs = (
    state = {
        isLoading: true,
        errMess: null,
        staffs: []
},
action) => {
    
    switch (action.type) {
        case ActionTypes.STAFFS_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                staffs: []
            };
        
        case ActionTypes.STAFFS_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                staffs: []
            };    
        
        case ActionTypes.STAFFS_ADD:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                staffs: action.payload
            };        
    
        default:
            return state;
    }
}