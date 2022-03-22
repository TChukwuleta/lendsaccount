const db = require('../config/dbConfig')

const createUser = async (firstName, lastName, email, password, accountNo, balance) => {
    const [ acctno ] = await db('user').insert({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        account_no: accountNo,
        account_balance: balance
    })
    return acctno
}

const checkUser = async (email) => {
    const ab = await db('user').select("email", "password", "first_name", "account_balance")
    .where({ email: email })
    return ab
}

const findUserAcct = async (acctNo) => {
    const receiver = await db('user').select("email","first_name", "account_balance", "account_no")
    .where({ account_no: acctNo })
    return receiver
}

const updateUserAccount = async (email, amount) => {
    const updatedUser = await db('user').where({ email, email }).update({  account_balance: amount })
    return updatedUser
}

module.exports = {
    createUser,
    checkUser,
    findUserAcct,
    updateUserAccount
}