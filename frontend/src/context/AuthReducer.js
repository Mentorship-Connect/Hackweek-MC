import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    DELETE_SUCCESS,
    DELETE_FAIL
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
            localStorage.setItem('profile', JSON.stringify(action.payload))
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

        case DELETE_SUCCESS:
            localStorage.removeItem('token')
            localStorage.removeItem('profile')
        return {
            ...state,
            users: state.users.filter(user => user._id !== action.payload)
        }

        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
        case DELETE_FAIL:
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