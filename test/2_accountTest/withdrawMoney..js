const expect = require('chai').expect
const request = require('supertest')
const appServer = require('../../app')

describe('WITHDRAW MONEY', () => {
    let token;

    it('Logs in a user Successfully', async () => {
        const response = await request(appServer).post('/login').send({
            email: "johndoeee@yopmail.com",
            password: "johndoee"
        })
        expect(201)
        token = response._body.message
    })

    it('Returns a 400 response as there is no authorization token that was passed', async () => {
        await request(appServer).post('/withdraw').send({
            amount: 20
        })
        .expect(400)
    })

    it('Returns a 400 response as amount is set to 0', async () => {
        await request(appServer).post('/withdraw').set('Authorization', `Bearer ${token}`).send({
            amount: 0
        })
        .expect(400)
    })

    it('Withdraws Money Successfully', async () => {
        const response = await request(appServer).post('/withdraw').set('Authorization', `Bearer ${token}`).send({
            amount: 100
        })
        .expect(201)
    })
})

