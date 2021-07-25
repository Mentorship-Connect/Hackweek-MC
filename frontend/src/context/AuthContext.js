import { useReducer, createContext } from "react";
import AuthReducer from './AuthReducer'
import setAuthToken from './setToken'
import axios from 'axios'
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


export const AuthContext = createContext()

export const AuthContextProvider = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    // ACTIONS
    // Load User
    const loadUser = async () => {
    setAuthToken(localStorage.token)

    try {
        const res = await axios.get('/v1/api/users')
        console.log("res", res)

        dispatch({
        type: USER_LOADED,
        payload: res.data
        })
    } catch (err) {
        dispatch({ type: AUTH_ERROR })
    }
    }

    // Register User
    const register = async (user) => {
    const headers = {
        'Content-Type': 'application/json'
    }

    try {
        const res = await axios.post('/v1/api/users', user, headers)

        dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
        })
    } catch (err) {
        dispatch({
        type: REGISTER_FAIL,
        payload: err
        })
    }
    }

    // Login User
    const loginUser = async (user) => {
    const headers = {
        'Content-Type': 'application/json'
    }

    try {
        const res = await axios.post('/v1/api/users/login', user, headers)
        console.log("res::", res)
        dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
        })

        loadUser()
    } catch (err) {
        dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
        })
    }
    }

    // Logout
    const logout = () => dispatch({ type: LOGOUT })

    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS })


    return (
    <AuthContext.Provider value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: true,
        user: null,
        error: null,
        loadUser,
        register,
        loginUser,
        logout,
        clearErrors
    }}>
        {props.children}
    </AuthContext.Provider>
    )
}