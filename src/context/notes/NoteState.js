
import NoteContext from "./noteContext";
import React , { useState } from "react";


const NoteState = (props)=>{
         const host = "http://localhost:4000/"
        //  const notes = [    {
        //   "_id": "6298c18004881a03c5b8642f",
        //   "user": "62937b0ba9211772bbbe5adc",
        //   "title": "titles",
        //   "description": "description",
        //   "tag": "tag" ,
        //   "date": "2022-06-02T13:56:16.679Z",
        //   "__v": 0
        // }]
         const [note , setNotes ] = useState([])

         const getAllNotes = async()=>{
          
          const noteData = await fetch(`${host}api/notes/getnote`,{
            method : "GET",
            headers : {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem('token')
            } 
           })
           const json = await noteData.json()
         
          const {note} = json  
             setNotes(note)
            //  getAllNotes()
         }
         
  
    const addNewNote = async (newNoteData)=>{
     
      
      // const notess =       {
      //   "_id": "6298c18004881a03c5b8642f",
      //   "user": "62937b0ba9211772bbbe5adc",
      //   "title": title,
      //   "description": description,
      //   "tag": tag ,
      //   "date": "2022-06-02T13:56:16.679Z",
      //   "__v": 0
      // }
      // setNotes(note.concat(notess))

      console.log(newNoteData)
      await fetch(`${host}api/notes/savenote`,
      {
        method : "POST",
        headers : {
          'Content-Type': 'application/json',
          'auth-token' : localStorage.getItem('token')
        },
        body : JSON.stringify(newNoteData)
      }
      )
      .then(()=>console.log("data added"))
      .catch((err)=>console.log(err))
      getAllNotes()
    }

    const deleteNote = async (id)=>{
     let val =  window.confirm("Are you sure to delete this note ???")
     if(val){
      await fetch(`${host}api/notes/deletenote/${id}`,{
        method : "DELETE",
        headers : {
          'Content-Type': 'application/json',
          'auth-token' : localStorage.getItem('token')
        }
      }
      ).then(()=>console.log("deleted successfully"))
      getAllNotes()
     }

    }

    const updateNote = (id , newData)=>{
      fetch(`${host}api/notes/updatenote/${id}`,
      {
        method : "PUT",
        headers : {
          'Content-Type': 'application/json',
          'auth-token' :localStorage.getItem('token')
        },
        body : JSON.stringify(newData)
      }
      )
      getAllNotes()
    }

    return (
        <NoteContext.Provider value={{note , setNotes,  addNewNote , deleteNote ,getAllNotes , updateNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState