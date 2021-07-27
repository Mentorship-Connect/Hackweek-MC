import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


const UserPage = () => {
    const {id} = useParams()
    const {selectedUser, setSelectedUser} = useContext(AuthContext)

    useEffect(() => {
        console.log('hhihihih')
        const fetchData = async () => {
            try {
                const res = await axios.get(`/v1/api/users/${id}`)
                console.log(res)
                setSelectedUser(res)      
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [id, setSelectedUser])

    console.log('selected user..', selectedUser)
    return (
        <div>
            {selectedUser && (
                <>
                    <h1>{selectedUser.name}</h1>
                    <h2>{selectedUser.email}</h2>
                </>
            )}
        </div>
    )
}

export default UserPage
