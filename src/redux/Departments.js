import * as ActionTypes from "./ActionTypes.js";

export const Departments = (
    state = {
        isLoading: true,
        errMess: null,
        departments: []
},
action) => {
    
    switch (action.type) {
        case ActionTypes.DEPARTMENTS_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                departments: []
            };
        
        case ActionTypes.DEPARTMENTS_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                departments: []
            };    
        
        case ActionTypes.DEPARTMENTS_ADD:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                departments: action.payload
            };        
    
        default:
            return state;
    }
}