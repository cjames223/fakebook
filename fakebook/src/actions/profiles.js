import { FETCH_ALL_PROFILES } from '../constants/actionTypes'
import * as api from '../api'

export const getProfiles = () => async (dispatch) => {
    try {
        const { data } = await api.fetchProfiles()

        dispatch({ type: FETCH_ALL_PROFILES, payload: data })
    } catch (error) {
        console.log(error)
    }
}