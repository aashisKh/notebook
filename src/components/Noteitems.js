import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'

function Noteitems(props) {
  const context = useContext(NoteContext)
  const { deleteNote } = context
  const { _id, title, description  } = props.noteData
  let  {displayModal} = props

  return (
    <>
      <div className='col-md-3'></div>
      <div className='col-md-12'>
    
        <div className="card text-dark bg-primary mb-3">
          <div className="card-body  text-white text-center">
            <h5 className="card-title">{title} </h5>
            <p className="card-text"> {description} </p>
            <i className='fa fa-trash text-danger' onClick={() => { deleteNote(_id) }}></i> <i className='fa fa-pencil text-warning' onClick={()=>{displayModal(props.noteData)}} ></i>
          </div>
        </div>
      </div>
      <div className='col-md-3'></div>

     
    </>

  )
}

export default Noteitems
