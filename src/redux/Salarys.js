import * as ActionTypes from "./ActionTypes.js";

export const Salarys = (
    state = {
        isLoading: true,
        errMess: null,
        salarys: []
},
action) => {
    
    switch (action.type) {
        case ActionTypes.SALARYS_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                salarys: []
            };
        
        case ActionTypes.SALARYS_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                salarys: []
            };    
        
        case ActionTypes.SALARYS_ADD:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                salarys: action.payload
            };        
    
        default:
            return state;
    }
}