import React , {} from 'react'
import {Link , useLocation, useNavigate} from 'react-router-dom'
// import NoteContext from '../context/notes/noteContext'
function Navbar() {
  let navigate = useNavigate()
  const handleLogout = (e)=>{
    e.preventDefault()
    localStorage.removeItem('token')
    navigate('/login')
  }

  // let context = useContext(NoteContext)
  // let {setNotes } = context
  // const [searchVal , setSearchVal] = useState({search : ''})
    const location = useLocation()
    // const donothing = (e)=>{
    //   e.preventDefault()
    // }
    // const searchNote = async ()=>{
    //   let val = document.getElementById("searchValue").value
    //   if(val.length == 0){
    //     alert("Please enter some value")
    //   }
    //   const response = await fetch(`http://localhost:4000/api/notes/searchnotes/${searchVal.search}`,
    //   {
    //     method : "GET",
    //     headers : {
    //       'Content-Type': 'application/json',
    //       'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5MzdiMGJhOTIxMTc3MmJiYmU1YWRjIn0sImlhdCI6MTY1Mzk2ODI4M30.lOBT7qzSvRSw_xT-7maJ1F31gLMXhFkgiZ4frqM64Rs'
    //     } 
    //   }

    //   ) 
    //   const json = await response.json()
    //   // console.log(json.note)
    //   setNotes(json.note)
    // }
    // const setSearch = (e)=>{
    //   setSearchVal({...searchVal , [e.target.name] : e.target.value})
    // }
  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/' ? 'acitve' : ''}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
        </li>
      </ul>
      {/* <form className="d-flex" role="search" onSubmit={donothing}>
        <input className="form-control me-2" id="searchValue" type="search" placeholder="Search" aria-label="Search" name="search" value={searchVal.search}  onChange={setSearch} />
        <button className="btn btn-outline-success" type="button" onClick={searchNote}>Search</button>
      </form> */}
     { !localStorage.getItem('token') ?  <div className='d-flex'>
      <Link to="/login" className='btn btn-primary mx-1'>Login</Link>
      <Link to="/signup" className='btn btn-primary mx-1'>Signup</Link>
        </div> : <button className="btn btn-primary " onClick={handleLogout}>Logout</button>}

    </div>
  </div>
</nav>
  )
}

export default Navbar
