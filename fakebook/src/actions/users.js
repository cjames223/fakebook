import { FETCH_ALL_USERS, FETCH_USER } from '../constants/actionTypes'
import * as api from '../api'

export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUsers()

        dispatch({ type: FETCH_ALL_USERS, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const getUser = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(id)
        
        dispatch({ type: FETCH_USER, payload: data })
    } catch (error) {
        console.log(error)
    }
}

