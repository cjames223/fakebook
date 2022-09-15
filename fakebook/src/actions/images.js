import { UPLOAD_PHOTO, FETCH_ALL_PHOTOS } from '../constants/actionTypes'
import * as api from '../api'

export const uploadPhoto = (photoData) => async (dispatch) => {
    try {
        const { data } = await api.uploadPhoto(photoData)

        dispatch({ type: UPLOAD_PHOTO, payload: data})

        return data.images
    } catch (error) {
        console.log(error)
    }
}

export const getPhotos = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPhotos()

        dispatch({ type: FETCH_ALL_PHOTOS, payload: data})
    } catch (error) {
        console.log(error)
    }
}