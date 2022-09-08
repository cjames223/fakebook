import { FETCH_PHOTO_CONTAINER_CARD } from '../constants/actionTypes'

export const getPhotoContainerCard = (ref) => (dispatch) => {
    try {
        const data = ref.current

        dispatch({ type: FETCH_PHOTO_CONTAINER_CARD, payload: data})
    } catch(error) {
        console.log(error)
    }
}