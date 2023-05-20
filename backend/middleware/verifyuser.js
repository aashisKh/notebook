

// middleware to verify the user token
const jwt = require('jsonwebtoken');

const jwtSecret = 'rockingboy'
const middleWare = (req , res , next)=> {
    
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error : 'invalid token'})
    }
    try {
        
        const userData = jwt.verify(token , jwtSecret)
      
        
        req.user = userData.user
    } catch (error) {
        res.send({error : error.message})
    }
    
    

    next();
}

module.exports = middleWare