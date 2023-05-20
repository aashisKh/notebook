import React , {useContext , useState} from 'react'
import NoteContext from '../context/notes/noteContext'
function AddNote() {
    let context = useContext(NoteContext)
    const {addNewNote} = context
    const [field , setField ] = useState({title : '' , description : '' , tag : ''})
    const setFields = (e)=>{
        setField({...field , [e.target.name] : e.target.value})
    }
    const [message , setMessage] = useState({display : "none"})
    const [msg , setMsg] = useState({message : ""})
    const [warning , setWarning ] = useState({war : "bg-success"})
    let clsName = `col-md-12 col-lg-5 p-3 ${warning.war} text-center text-white  position-absolute`
    // noteMessage.style.display = "none"
    const submitNewNote = (e)=>{
        e.preventDefault()
        if(field.title.length === 0 || field.description.length === 0 || field.tag.length === 0){
          setMsg({message : "Form cannot be empty"})
          setWarning({war : "bg-warning"})
          setMessage({display  : "block"})
          hide()
        }else{
          
          
          addNewNote(field)
          setWarning({war : "bg-success"})
          setMessage({display  : "block"})
          setMsg({message : "Note is added successfully!!!"})
          setField({title : '' , description : '' , tag : ''})
          hide()
        }

      
    }

    const hide = ()=>{
      setTimeout(() => {
        setMessage({display  : "none"})
      }, 2000);
    }
  return (
    <>
  <div className="container">
  <div className='row '>
  <div className='col-md-0 col-lg-3'></div>
        <div className='col-md-12 col-lg-6'>
        <div className={clsName} style={{display:message.display }}> {msg.message} </div>
        </div>
  </div>
  </div>
    <div className='container mt-5'>
      <div className='row'>
       
        <div className='col-md-0 col-lg-3'></div>
        <div className='col-md-12 col-lg-6'>

             <h4> Add new Notes To the database </h4>
             <form className='form-control'>
                
               <label htmlFor='title' className='mt-2'>Title</label><input type = "text" className='form-control' value={field.title} name="title" id='title' onChange={setFields} placeholder="Enter Notes Title" />
               <label className='mt-2'>Description</label><textarea rows="3"  type = "text" className='form-control' name='description' value={field.description} id="description" placeholder="Enter Notes Description" onChange={setFields}/>
               <label className='mt-2'>Tag</label><input type = "text" className='form-control' name='tag' value={field.tag} id="tag" placeholder="Enter Notes Tag" onChange={setFields}
               />
               <input type="button" value = "Add Note" className='btn btn-primary mt-3 form-control' onClick={submitNewNote}></input>
             </form>
        </div>
        <div className='col-md-0 col-lg-3'></div>
      </div>
    </div>
    </>
  )
}

export default AddNote
