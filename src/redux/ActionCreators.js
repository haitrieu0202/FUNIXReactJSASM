import * as ActionTypes from "./ActionTypes.js";
import { baseUrl } from "./baseUrl.js";

//STAFFS
const staffsLoading = () => {
    return {
        type: ActionTypes.STAFFS_LOADING
    }
};

const staffsFailed = (err) => {
    return {
        type: ActionTypes.STAFFS_FAILED,
        payload: err
    }
};

const addStaffs = (staff) => {
    return {
        type: ActionTypes.STAFFS_ADD,
        payload: staff
    }
};

export const fetchStaffs = () => (dispatch) => {
if (dispatch(staffsLoading(true)))
    return fetch(baseUrl + "staffs")
    .then (
        (res) => {
            if (res.ok) {
                return res
            }
            else {
                var error = new Error (
                    "Error " + res.status + ": " + res.statusText
                );
                error.response = res;
                throw error;
            }
        },
        (error) => {
            var errmess = new Error (error.message);
            throw errmess;
        }
    )
    .then ((res) => res.json())
    .then ((staffs) => dispatch(addStaffs(staffs)))
    .catch ((error) => dispatch(staffsFailed(error.message)))
}

//DEPARTMENT
const departLoading = () => {
    return {
        type: ActionTypes.DEPARTMENTS_LOADING
    }
};

const departFailed = (err) => {
    return {
        type: ActionTypes.DEPARTMENTS_FAILED,
        payload: err
    }
};

const addDepart = (depart) => {
    return {
        type: ActionTypes.DEPARTMENTS_ADD,
        payload: depart
    }
};

export const fetchDepart = () => (dispatch) => {
if (dispatch(departLoading(true)))
    return fetch(baseUrl + "departments")
    .then (
        (res) => {
            if (res.ok) {
                return res
            }
            else {
                var error = new Error (
                    "Error " + res.status + ": " + res.statusText
                );
                error.response = res;
                throw error;
            }
        },
        (error) => {
            var errmess = new Error (error.message);
            throw errmess;
        }
    )
    .then ((res) => res.json())
    .then ((depart) => dispatch(addDepart(depart)))
    .catch ((error) => dispatch(departFailed(error.message)))
}

//SALARY
const salarysLoading = () => {
    return {
        type: ActionTypes.SALARYS_LOADING
    }
};

const salarysFailed = (err) => {
    return {
        type: ActionTypes.SALARYS_FAILED,
        payload: err
    }
};

const addSalarys = (salarys) => {
    return {
        type: ActionTypes.SALARYS_ADD,
        payload: salarys
    }
};

export const fetchSalarys = () => (dispatch) => {
if (dispatch(salarysLoading(true)))
    return fetch(baseUrl + "staffsSalary")
    .then (
        (res) => {
            if (res.ok) {
                return res
            }
            else {
                var error = new Error (
                    "Error " + res.status + ": " + res.statusText
                );
                error.response = res;
                throw error;
            }
        },
        (error) => {
            var errmess = new Error (error.message);
            throw errmess;
        }
    )
    .then ((res) => res.json())
    .then ((salarys) => dispatch(addSalarys(salarys)))
    .catch ((error) => dispatch(salarysFailed(error.message)))
}

//PUSH DATA
export const pushStaff = (pushData) => (dispatch) => {
    fetch((baseUrl + "staffs"),{
        method: "POST",
        body: JSON.stringify(pushData),
        headers: { "Content-type": "application/json" }
    })
    .then(
        (res) => {
            if (res.ok) {
                return res
            }
            else {
                var error = new Error (
                    "Error " + res.status + ": " + res.statusText
                );
                error.response = res;
                throw error;
            }
        },
        (error) => {
            var errmess = new Error (error.message);
            throw errmess;
        }
    )
    .then((res) => res.json())

    .then((data) => {
        dispatch(addStaffs(data))
    })
}

//DELETE DATA
export const deleteData = (id) => (dispatch) => {
    fetch(
        (baseUrl + "staffs/" + id),
        {
            method: "DELETE",
            headers: { "Content-type": "application/json" }
        }
    )
    .then((res) => res.json())
    .then((data) => {
        dispatch(addStaffs(data))
    })
}

//EDIT DATA
export const editData = (data) => (dispatch) => {
    fetch((baseUrl + "staffs"),{
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" }
    })
    .then(
        (res) => {
            if (res.ok) {
                return res
            }
            else {
                var error = new Error (
                    "Error " + res.status + ": " + res.statusText
                );
                error.response = res;
                throw error;
            }
        },
        (error) => {
            var errmess = new Error (error.message);
            throw errmess;
        }
    )
    .then((res) => res.json())

    .then((data) => {
        dispatch(addStaffs(data))
    })
}