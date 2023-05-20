import React from 'react'

const Dashboard = () => {
    if(localStorage.getItem('token')){
        return (
            <div className='mt-5'>
              Welcome to dashboard
            </div>
          )
    }

    return (
        <div className='mt-5'> Cannot access dashboard without login </div>
    )

}

export default Dashboard
