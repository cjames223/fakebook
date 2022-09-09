import { FETCH_ALL_PROFILES, UPLOAD_PHOTO } from '../constants/actionTypes'
import * as api from '../api'

export const getProfiles = () => async (dispatch) => {
    try {
        const { data } = await api.fetchProfiles()

        dispatch({ type: FETCH_ALL_PROFILES, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const uploadPhoto = (id, photoData) => async (dispatch) => {
    try {
        const { data } = await api.uploadPhoto(id, photoData)

        dispatch({ type: UPLOAD_PHOTO, payload: data})

        return data.images
    } catch (error) {
        console.log(error)
    }
}