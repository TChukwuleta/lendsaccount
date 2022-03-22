const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const validateUser = (req, res, next) => {
    const token = req.get('Authorization')
    if(token){
        jwt.verify(token.split(' ')[1], `${process.env.SecretKey}`, async (err, decoded) => {
            if(err) return res.status(400).send("Authorization Error")
            req.user = decoded
            next()
        })
    }
    else {
        return res.status(400).send("Authorization Error")
    }
}

module.exports = {
    validateUser
}