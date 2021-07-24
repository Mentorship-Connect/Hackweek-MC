import axios from 'axios'

// Set token
const setAuthToken = (token) => {
  console.log("token..", token)
  if (token) {
    axios.defaults.headers.common['Authorization'] = token
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken