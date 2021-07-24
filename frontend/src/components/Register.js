import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Register = props =>{
    const authContext = useContext(AuthContext)
    const { register } = authContext
    const [user, setUser] = useState({name: "", email : "", password : ""});
    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = () => {
        setUser({name : "", email : "", password : ""});
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (user.name === '' || user.email === '' || user.password === '') {
          alert('Please enter all fields')
        } else {
          register(user)
          resetForm()
        }
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <h3>Please Register</h3>
                <label htmlFor="name" className="sr-only">name: </label>
                <input type="text" 
                       name="name" 
                       value={user.name}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter name"/>
                <label htmlFor="email" className="sr-only">email: </label>
                <input type="email" 
                       name="email"
                       value={user.email} 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter email"/>
                <label htmlFor="password" className="sr-only">password: </label>
                <input type="text" 
                       name="password"
                       value={user.password}  
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter password"/>
                <button className="btn btn-lg btn-primary btn-block" 
                        type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;