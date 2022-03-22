const userService = require('../service/userService')
const Joi = require('joi')

// Registration validation schema
const transferSchema = Joi.object({
    amount: Joi.number().required(),
    receiver: Joi.number().required()
})

const amountSchema = Joi.object({
    amount: Joi.number().integer().required()
})

const depositMoney = async (req, res) => {
    const user = req.user
    if(user){
        const findUser = await userService.findUser(user.email)
        if(findUser[0]){
            const { error } = amountSchema.validate(req.body)
            if(error) return res.status(400).send(error.details[0].message)
            const { amount } = req.body
            if(amount == 0) return res.status(400).json({ message: "Please enter a valid amount to be deposited" })
            const newBalance = findUser[0].account_balance + amount
            await userService.updateDetails(findUser[0].email, newBalance)
            return res.status(201).json({ message: `You have successfully deposited ${amount} to your account` })
        }
        return res.status(400).json({ message: "Invalid User" })
    }
}

const transferMoney = async (req, res) => {
    const user = req.user
    if(user){
        const findUser = await userService.findUser(user.email)
        if(findUser[0]){
            const { error } = transferSchema.validate(req.body)
            if(error) return res.status(400).send(error.details[0].message)
            const { amount, receiver } = req.body
            if(amount == 0) return res.status(400).json({ message: "Please enter a valid amount to be transferred" })
            const findReceiver = await userService.findAccountNo(receiver)
            console.log(findReceiver)
            if(!findReceiver[0]) return res.status(400).json({ message: "Receiver account does not exist" })
            if(findUser[0].account_balance < amount) return res.status(400).json({ message: "Insufficient balance" })
            // For Sender
            const newSenderBalance = findUser[0].account_balance - amount
            await userService.updateDetails(findUser[0].email, newSenderBalance)
            // For Receiver
            const newReceiverBalance = findReceiver[0].account_balance + amount
            await userService.updateDetails(findReceiver[0].email, newReceiverBalance)
            return res.status(201).json({ message: `You have successfully transferred ${amount} from your account to ${receiver}` })
        }
        return res.status(400).json({ message: "Invalid User" })
    }
}

const withdrawMoney = async (req, res) => {
    const user = req.user
    if(user){
        const findUser = await userService.findUser(user.email)
        if(findUser[0]){
            const { error } = amountSchema.validate(req.body)
            if(error) return res.status(400).send(error.details[0].message)
            const { amount } = req.body
            if(amount == 0) return res.status(400).json({ message: "Please enter a valid amount to be withdrawn" })
            if(findUser[0].account_balance < amount) return res.status(400).json({ message: "Insufficient balance" })
            const newBalance = findUser[0].account_balance - amount
            await userService.updateDetails(findUser[0].email, newBalance)
            return res.status(201).json({ message: `You have successfully withdrawn ${amount} from your account` })
        }
        return res.status(400).json({ message: "Invalid User" })
    }
}


module.exports = {
    depositMoney,
    transferMoney,
    withdrawMoney
}