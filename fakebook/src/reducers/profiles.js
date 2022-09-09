import { FETCH_ALL_PROFILES, UPLOAD_PHOTO } from "../constants/actionTypes"

export default (profiles = [], action) => {
    switch (action.type) {
        case FETCH_ALL_PROFILES:
            return action.payload
        case UPLOAD_PHOTO:
            return profiles.map((profile) => profile.userId === action.payload._id ? action.payload : profile)
        default:
            return profiles
    }
}