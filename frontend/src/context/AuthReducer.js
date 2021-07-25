import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from './types'
  
// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: action.payload
        }

        case REGISTER_SUCCESS:
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('profile', action.payload)
        return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            loading: false
        }

        case LOGIN_SUCCESS:
        console.log(action.payload)
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('profile', JSON.stringify(action.payload))
        return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            loading: false
        }

        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
        localStorage.removeItem('token')
        localStorage.removeItem('profile')
        return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
            error: action.payload
        }

        case CLEAR_ERRORS:
        return {
            ...state,
            error: null
        }

        default:
        return state
    }
}