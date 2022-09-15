import { FETCH_ALL_PROFILES, UPLOAD_PHOTO, FETCH_PROFILE} from "../constants/actionTypes"

export default (profiles = [], action) => {
    switch (action.type) {
        case FETCH_ALL_PROFILES:
            return action.payload
        default:
            return profiles
    }
}