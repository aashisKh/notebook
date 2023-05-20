
// this is where model of  notes is done model means table where data are saved in json format

const mongoose = require("mongoose")
const { Schema } = mongoose;
const notesSchema = new Schema({
    user  : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    tag : {
        type : String,
        default : 'general'
    },

    date : {
        type : Date,
        default : Date.now
    }
})

const Note =  mongoose.model('note' , notesSchema)

module.exports = Note