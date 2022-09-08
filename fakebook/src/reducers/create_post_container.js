import { FETCH_CREATE_POST_CONTAINER } from "../constants/actionTypes"

export default (create_post_container = [], action) => {
    switch (action.type) {
        case FETCH_CREATE_POST_CONTAINER:
            return action.payload
        default:
            return create_post_container
    }
}