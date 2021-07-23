import axios from 'axios'

export const register = async (user) => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
    }

    const res = await axios.post('/v1/api/users', user , config)

    return res.data
}

export const logout = async () => {
    const res = await axios.get('/v1/api/logout')
    
    return res.data
}

export const Authenticated = async () => {
    try {
        const res = await axios.get('/v1/api/authenticated')

        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}