
//import monggose 
const mongoose = require("mongoose");
//mongodb databse name
const mongooseUri = "mongodb://localhost:27017/iNotebook"

//database connection function to connect db
const connectDb = ()=>{
    mongoose.connect(mongooseUri , ()=>{
        console.log("connected to datbase success")
    })
}

// exported function to use later
module.exports = connectDb