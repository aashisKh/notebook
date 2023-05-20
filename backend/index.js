
// import express for navigation and more 
const express = require('express')
const cors = require('cors')







const path = require('path');
// use database function to connect with mongodb database
const dbConnection = require("./db")
dbConnection() // function call

//make app funciton to run express 
const app = express()


app.use(cors())
const port = 4000

// middleware to send json data to the browser
app.use(express.json())
// app.get("/" ,(req , res)=>{
//     res.send('working')
// })
// app.get("/about" ,(req , res)=>{
//     res.send('this is about')
// })

// home page route
const urlList = ['/' , '/about' , '/contactus']
const middleFunction = (req , res , next)=>{
    const { url } = req
    
    if(!urlList.includes(url)){
        res.send("url not correct")
    }
    // res.send("this is middleware function")
    next()
    
}
app.get('/' , middleFunction, (req , res)=>{
    // console.log(window.localStorage.getItem('token'))
    res.sendFile(path.join(__dirname +'/home.html'))
    
   
})




// api/auth -> user authentication navigation rotuer 
app.use('/api/auth' , require('./routes/auth'))
// api/notes -> notes crud  navigation rotuer 
app.use('/api/notes' , require('./routes/notes'))

// app.use('/api/auth' , require('./routes/auth'))

// run server on port = 4000
app.listen(port , ()=>{
    console.log("server running ")
})
















// const app = express()
// const port = 3000
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })