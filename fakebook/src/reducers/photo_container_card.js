import { FETCH_PHOTO_CONTAINER_CARD } from "../constants/actionTypes"

export default (photo_container_card = [], action) => {
    switch (action.type) {
        case FETCH_PHOTO_CONTAINER_CARD:
            return action.payload
        default:
            return photo_container_card
    }
}