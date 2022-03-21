const userDao = require('../dao/userDao')

const createUserService = (userDto) => {
    const { firstname, lastname, email, hashedPassword, balance, newUserAccount } = userDto
    return userDao.createUser(firstname, lastname, email, hashedPassword, newUserAccount, balance)
} 

const findUser = (email) => {
    return userDao.checkUser(email)
}

const findAccountNo = (accountNo) => {
    return userDao.findUserAcct(accountNo)
}

const updateDetails = (email, amount) => {
    return userDao.updateUserAccount(email, amount)
}

module.exports = {
    createUserService,
    findUser,
    findAccountNo,
    updateDetails
}