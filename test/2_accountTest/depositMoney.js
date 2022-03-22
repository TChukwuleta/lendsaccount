const expect = require('chai').expect
const request = require('supertest')
const appServer = require('../../app')

describe('DEPOSIT MONEY', () => {
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
        await request(appServer).post('/deposit').send({
            amount: 20
        })
        .expect(400)
    })

    it('Returns a 400 response as amount is set to 0', async () => {
        await request(appServer).post('/deposit').set('Authorization', `Bearer ${token}`).send({
            amount: 0
        })
        .expect(400)
    })

    it('Deposits Money Successfully', async () => {
        await request(appServer).post('/deposit').set('Authorization', `Bearer ${token}`).send({
            amount: 200
        })
        .expect(201)
    })
})