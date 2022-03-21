const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const accountController = require('../controllers/accountController')
const { validateUser } = require('../middleware/auth')

// Authentication
router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)

// Accounts
router.post('/deposit', validateUser, accountController.depositMoney)
router.post('/withdraw', validateUser, accountController.withdrawMoney)
router.post('/transfer', validateUser, accountController.transferMoney)


module.exports = router