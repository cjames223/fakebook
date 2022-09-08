import { FETCH_ALL_USERS, UPDATE_USER } from '../constants/actionTypes'
import * as api from '../api'

export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUsers()

        dispatch({ type: FETCH_ALL_USERS, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = (id, user) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(id, user)

        dispatch({ type: UPDATE_USER, payload: data})
    } catch (error) {
        console.log(error)
    }
}

