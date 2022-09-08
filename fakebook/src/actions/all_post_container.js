import { FETCH_ALL_POST_CONTAINER } from '../constants/actionTypes'

export const getAllPostContainer = (ref) => (dispatch) => {
    try {
        const data = ref.current

        dispatch({ type: FETCH_ALL_POST_CONTAINER, payload: data})
    } catch(error) {
        console.log(error)
    }
}