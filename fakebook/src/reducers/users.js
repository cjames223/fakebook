import { FETCH_ALL_USERS, FETCH_USER } from "../constants/actionTypes"

export default (users = [], action) => {
    switch (action.type) {
        case FETCH_ALL_USERS:
            return action.payload
        case FETCH_USER:
            return users.map((user) => user._id === action.payload._id ? action.payload : user)
        default:
            return users
    }
}