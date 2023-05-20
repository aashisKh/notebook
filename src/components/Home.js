import React from 'react'
import Notes from './Notes'
import '../index.css'
// import Login from './Login'

import Login from './Login'

function Home() {

if(!localStorage.getItem('token')){
  return (
    <Login />
  )
}
  return (
<Notes />
  )



}

export default Home
