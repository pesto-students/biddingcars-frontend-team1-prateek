import { authConstants } from './constants'


export const signin = ({ userName, password }) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: authConstants.LOGIN_REQUEST
            })
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:userName
            })
			
		} catch (error) {
			dispatch({
				type: authConstants.LOGIN_FAILURE
			})
		}
	}
}