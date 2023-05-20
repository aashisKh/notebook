const express = require("express")
const route = express.Router()
const Note = require('../models/Notes')
const verifyuser = require('../middleware/verifyuser')

// this  route gets saved notes from the database
route.get('/getnote',verifyuser,  async (req , res)=>{
   
    
    const note = await Note.find({user : req.user.id})
    res.send({note})
})



//this route saves the new notes to the database
route.post('/savenote' , verifyuser , async (req , res)=>{
    try {
        const id = req.user.id
        const note = new Note({
            title : req.body.title,
            description : req.body.description,
            tag : req.body.tag.trim(),
            user : req.user.id
        })
        const savedNote = await note.save()
        console.log("note saved")
        res.send(savedNote)
    } catch (error) {
        res.send({error : error.message})
    }

})



// update existing notes

route.put('/updatenote/:id' , verifyuser , async (req , res)=>{
    const {title , description , tag} = req.body
    let newNoteValues = {}
    if(title){
        newNoteValues.title = title
    }
    if(description){
        newNoteValues.description = description
    }
    if(tag){
        newNoteValues.tag = tag
    }

    let note = await Note.findById(req.params.id)
    if(!note){return res.send("note dosenot exists")}

    if(req.user.id !== note.user.toString()){
        return res.send("user not varified")
    }

    note = await Note.findByIdAndUpdate(req.params.id , {$set : newNoteValues} , {new : true})

    res.json({note})


})


route.delete('/deletenote/:id' , verifyuser , async (req , res)=>{
    let note = await Note.findById(req.params.id)
    if(!note){return res.send("note dosenot exists")}

    if(req.user.id !== note.user.toString()){
        return res.send("user not varified")
    }

    note = await Note.findByIdAndDelete(req.params.id)

    res.json({"Success" : "The note has been deleted"})


})

route.get('/searchnotes/:searchParam',verifyuser , async(req , res)=>{
    console.log(req.params.searchParam)
    let note = await Note.find({ tag :  req.params.searchParam})
    res.json({note})
})
module.exports = route