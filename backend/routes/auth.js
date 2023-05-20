const express = require("express")

// imported router from express to use routing mechanism
const route = express.Router()

//imported User model from model folder
const User = require("../models/Users")

// input field validationg node js validator 
const { body, validationResult } = require('express-validator');

// import bcryptjs to make secure pw and more 
const bcrypt = require('bcryptjs');

// use jwt for json web token 
const jwt = require('jsonwebtoken');

// use middleware to verify user auth-token
const middleWare = require('../middleware/verifyuser')

// jwt secrete code for making salt
const jwtSecret = 'rockingboy'

// route mechanism // this route give acces to  create the new user
route.post('/createuser',[
    
    body('name').isLength({min : 3}),
    body('password').isLength({min : 5}),
    body('email').isEmail()
], async (req , res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{

    
        let user = await User.findOne({email : req.body.email})
        if(user){
           return res.status(400).json({error : 'email already exists in the database'})
        }
        else{
            const salt = await bcrypt.genSalt(10)

            const securePassword = await bcrypt.hash(req.body.password , salt)
            
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword
              })


              

        }
        const data = {
            user : {
                id : user.id
            }
        }
        
        const authToken = jwt.sign(data , jwtSecret)
        
        res.json({success : true , token : authToken})
    }
    catch(err){
        res.status(500).json({"error" : err.message})
    }
    


})


// this route gives access to login the user
route.post('/login' , [
    body('email').isEmail(),
    body('password').exists()
] , async (req , res)=>{
   
    

    try{
        const {email , password} = req.body
    
        const user = await User.findOne({email : email})
        if(!user){
            return res.status(500).json({"error" : "email cannot be found"})
        }
        
    
        const isPasswordMatched = await bcrypt.compare(password , user.password)
        if(!isPasswordMatched){
            return res.status(500).json({"error" : "password dosenot match"})
        }
    
        const data = {
            user : {
                id : user.id
            }
        }
        const authToken = jwt.sign(data , jwtSecret)
        res.json({authToken , "message" : "success"})
    }
    catch(err){
       return res.json({"error" : err.message})
    }
})


// this route gives access to get the user from database
route.post('/getuser' , middleWare,  async (req , res)=>{

    const id = req.user.id
    const data = await User.findById(id).select("-password")

    res.send({data : data})
})


module.exports = route