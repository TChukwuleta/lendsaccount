const userService = require('../service/userService')
const bcrypt  = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Joi = require('joi')


// Registration validation schema
const registerSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8)
})

// Login validation schema
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8)
})

// token
const createToken = async (payload) => {
    return jwt.sign(payload, `${process.env.SecretKey}`, {
        expiresIn: 6 * 60 * 60
    })
} 

const createUser = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        const { firstname, lastname, email, password } = req.body
        const findPerson = await userService.findUser(email)
        if(findPerson[0]) return res.status(400).json({ message: "User with these details already exists" })
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUserAccount = Math.floor(100000000 + Math.random() * 9000000000);

        const newUserDetails = {
            firstname, 
            lastname,
            email,
            hashedPassword,
            newUserAccount,
            balance: 0
        }
        const user = await userService.createUserService(newUserDetails)
        res.status(201).json({ message: `Your account has been created successfully. Your account number is ${newUserAccount}` })
    } catch (error) {
        console.log(error) 
        res.status(400).json({ message: error })
    }
}

const loginUser = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        const { email, password } = req.body
        const findUser = await userService.findUser(email)
        if(!findUser[0]) return res.status(400).json({ message: "Invalid email and password" })
        const comparePassword = await bcrypt.compare(password, findUser[0].password)
        if(!comparePassword) return res.status(400).json({ message: "Incorrect Email or password" })

        const signature = await createToken({
            firstname: findUser[0].first_name,
            email: findUser[0].email
        })
        return res.status(201).json({ message: `${signature}` })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error })
    }
}


module.exports = {
    createUser,
    loginUser
}