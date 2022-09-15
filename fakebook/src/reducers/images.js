import { UPLOAD_PHOTO, FETCH_ALL_PHOTOS } from "../constants/actionTypes"

export default (images = [], action) => {
    switch (action.type) {
        case UPLOAD_PHOTO:
            return [...images, action.payload]
        case FETCH_ALL_PHOTOS:
            return action.payload
        default:
            return images
    }
}