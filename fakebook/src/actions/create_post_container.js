import { FETCH_CREATE_POST_CONTAINER } from '../constants/actionTypes'

export const getCreatePostContainer = (ref) => (dispatch) => {
    try {
        const data = ref.current

        dispatch({ type: FETCH_CREATE_POST_CONTAINER, payload: data})
    } catch(error) {
        console.log(error)
    }
}