import React , {useContext, useEffect , useState } from 'react'
// import {useNavigate} from 'react-router-dom'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import Noteitems from './Noteitems'

function Notes(props) {

// const navigate = useNavigate()
const context = useContext(noteContext)
const {note , getAllNotes , updateNote } = context


let [show, setShow] = useState(false)
let [messageUpdated , setMessageUpdated] = useState("none")
const [field, setField] = useState({ title: '', description: '', tag: '' })
useEffect(() => {
  // eslint-disable-next-line
  setField({ title: title, description: description, tag: tag })

}, [])
const setFields = (e) => {
  setField({ ...field, [e.target.name]: e.target.value })

}
let showModal = (data) => {
  document.body.style.overflowY = "hidden"
  setField(data)
  setShow(true)
}

useEffect(()=>{
   // eslint-disable-next-line

    getAllNotes()

 
  
// eslint-disable-next-line
},[])

const handleUpdate = (e) => {
  
console.log("function called")
  updateNote(field._id , field)
  getAllNotes()
  setMessageUpdated("block")
  hide()
 
  setShow(false)
  document.body.style.overflowY = "auto"
  
}
const hideModalBox = () => {
  // eslint-disable-next-line
  setShow(false)
  document.body.style.overflowY = "auto"
}

const hide = ()=>{
  setTimeout(() => {
    setMessageUpdated("none")
  }, 2000);
}

  return (
    <>
      <div className="container mt-3">
  <div className='row '>
  <div className='col-md-0 col-lg-3'></div>
        <div className='col-md-12 col-lg-6 mt-5'>
        <div className="col-md-12 col-lg-5 p-3 bg-success text-center text-white  position-absolute" style={{display:messageUpdated }}> Note IS Updated Successfully </div>
        </div>
  </div>
  </div>


        <div className='updateBox' id='modalBox' style={(show === true) ? { display: 'block' } : { display: 'none' }}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-2 col-lg-3'></div>
            <div className='col-md-8 col-lg-6'>

              <form className='card pt-3 pb-3 px-3 form'>
                <div className='cancelIcon'>
                  <i className='fa fa-times text-danger' id='hideModalBox' onClick={hideModalBox}></i>
                </div>
                <div>
                  <label htmlFor='title'>Title</label> <input type="text" className="form-control" name="title" id='title' onChange={setFields} value={field.title} />
                  <label htmlFor='description' className='mt-2'>Description</label> <textarea rows="3" type="text" name="description" className="form-control" onChange={setFields} value={field.description} />
                  <label htmlFor='tag' className='mt-2'>Tag</label> <input type="text" name='tag' id='tag' className="form-control" onChange={setFields} value={field.tag} />
                </div>
                <input type="button" value="Update Note" className='btn btn-primary mt-4 ' onClick={handleUpdate} />
              </form>

            </div>
            <div className='col-md-2 col-lg-2'></div>
          </div>
        </div>
      </div>
    <AddNote />
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-0 col-lg-3'></div>
        <div className='col-md-12 col-lg-6'>
        <h4>Your notes</h4>
          {note.length === 0 && 'No notes to display'}
          {note.map((val , index)=>{
            
            return (
                <Noteitems noteData = {val} key={index} displayModal = {showModal} />
            )
            
          })}
        </div>
        <div className='col-md-0 col-lg-3'></div>
      </div>
    </div>


    </>
  )
}

export default Notes
