import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USERS_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    DELETE_SUCCESS,
    DELETE_FAIL, 
    EDIT_SUCCESS,
    EDIT_FAIL
} from './types'
  
// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case USERS_LOADED:
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            users: action.payload
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
        return {
            ...state,
            ...action.payload,
        }

        case EDIT_FAIL:
        case DELETE_FAIL:
        return {
            ...state,
            error: action.payload
        }
        
        case EDIT_SUCCESS:
        return {
            ...state,
            users: state.users.map(user => user._id === action.payload._id ? action.payload : user)
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
            users: null,
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