const expect = require('chai').expect
const request = require('supertest')
const appServer = require('../../app')

describe('TRANSFER MONEY', () => {
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
        await request(appServer).post('/transfer').send({
            amount: 20
        })
        .expect(400)
    })

    it('Returns a 400 response when no receiver was indicated', async () => {
        await request(appServer).post('/transfer').set('Authorization', `Bearer ${token}`).send({
            amount: 20
        })
        .expect(400);
    })

    it('Returns a 400 response when the amount was not defined', async () => {
        await request(appServer).post('/transfer').set('Authorization', `Bearer ${token}`).send({
            amount: 0,
            receiver: 1103292546
        })
        .expect(400);
    })

    it('Transfers Money Successfully', async () => {
        await request(appServer).post('/transfer').set('Authorization', `Bearer ${token}`).send({
            amount: 30,
            receiver: 1103292546
        })
        .expect(201);
    })
})