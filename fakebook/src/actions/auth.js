import { AUTH } from '../constants/actionTypes'
import * as api from '../api'
import { Navigate } from 'react-router-dom'

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        // log in the user

        navigate('/home')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        // signup in the user

        navigate('/home')
    } catch (error) {
        console.log(error)
    }
}

