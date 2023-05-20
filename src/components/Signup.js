import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    let navigate = useNavigate()
    let [credentials , setCredentials] = useState({name : "" , email :"" , password : ""})

    const setValues = (e)=>{
        setCredentials({...credentials , [e.target.name] : e.target.value})
    }
    const handleFormSubmit = async (e)=>{
        e.preventDefault()

        let response = await fetch("http://localhost:4000/api/auth/createuser",
        {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({name : credentials.name , email : credentials.email , password : credentials.password})
        })
        setCredentials({name : "" , email : "" , password : ""})
        let data = await response.json()
        if(data.success){
            localStorage.setItem('token' , data.token)
            navigate("/")
        }
        console.log(data)
    }
  return (
    <>
    <div className='container mt-5'>
        <div className='row mt-5'>
            <div className='col-md-4'></div>
            <div className='col-md-4 mt-5'>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name="name" value={credentials.name} onChange={setValues} className="form-control"  aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" value={credentials.email} onChange={setValues} className="form-control"  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" value={credentials.password} onChange={setValues} className="form-control"  />
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

export default Signup
