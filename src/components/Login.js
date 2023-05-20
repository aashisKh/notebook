import React, { useState  } from 'react'
import {useNavigate} from 'react-router-dom'
// import noteContext from '../context/notes/noteContext'

const Login = () => {

    // const context = useContext(noteContext)
    // const {getAllNotes} = context
    let navigate = useNavigate()

    let [credentials, setCredentials] = useState({ email: "", password: "" })
    const setCredValue = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        let response = await fetch("http://localhost:4000/api/auth/login", {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email : credentials.email, password: credentials.password })



        })
        let data = await response.json()
        if(data.message === "success"){
            localStorage.setItem('token' , data.authToken)
            navigate("/")
            window.location.reload(true);
            console.log(data)
            // getAllNotes(data.authToken)
            
        }else{
            alert("use valid credentials")
        }
    }
    return (
        <>
            <div className='container mt-5'>
                <div className='row mt-5'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4 mt-5'>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" name="email" value={credentials.email} onChange={setCredValue} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" name="password" value={credentials.password} onChange={setCredValue} className="form-control" id="exampleInputPassword1" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div className='col-md-4'></div>
                </div>
            </div>

        </>
    )
}

export default Login
