import { useReducer, createContext, useState } from "react";
import AuthReducer from './AuthReducer'
import setAuthToken from './setToken'
import axios from 'axios'
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
  DELETE_FAIL
} from './types'

export const AuthContext = createContext()

export const AuthContextProvider = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        users: null,
        error: null
    }
    const [selectedUser, setSelectedUser] = useState('')

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    // ACTIONS
    // Load Users
    const loadUsers = async () => {
    setAuthToken(localStorage.token)

    try {
        const res = await axios.get('/v1/api/users')

        dispatch({
        type: USERS_LOADED,
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

        loadUsers()
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

            dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
            })

            loadUsers()
        } catch (err) {
            dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg
            })
        }
    }

    // Delete User
    const deleteUser = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${state.token}`,
            }
        }
    
        const res = await axios.delete(`/v1/api/users/${id}`, config)
        console.log('res delete context', res)
        dispatch({
        type: DELETE_SUCCESS,
        payload: res.data
        })

        loadUsers()
        } catch (err) {
            dispatch({
            type: DELETE_FAIL,
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
        users: null,
        error: null,
        selectedUser,
        setSelectedUser,
        loadUsers,
        register,
        loginUser,
        logout,
        clearErrors,
        deleteUser
    }}>
        {props.children}
    </AuthContext.Provider>
    )
}