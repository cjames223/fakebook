import { FETCH_ALL_POST_CONTAINER } from "../constants/actionTypes"

export default (all_post_container = [], action) => {
    switch (action.type) {
        case FETCH_ALL_POST_CONTAINER:
            return action.payload
        default:
            return all_post_container
    }
}