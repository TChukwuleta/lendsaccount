const expect = require('chai').expect
const request = require('supertest')
const appServer = require('../../app')

describe('DEPOSIT MONEY', () => {
    describe('DepositMoney', () => {
        describe('deposit money validation error', () => {
            describe('Deposit with improper field', () => {

                it('Returns a 400 response as amount is set to 0', async () => {
                    await request(appServer).post('/deposit').send({
                        amount: 0
                    })
                    .expect(400)
                })

                // it('Returns a 400 response as there is a duplicate user', async () => {
                //     await request(appServer).post('/register').send({
                //         firstname: "John",
                //         lastname: "Doe",
                //         email: "johndoe@yopmail.com",
                //         password: "johndoe"
                //     })
                //     .expect(400)
                // })
            })
        })

        // it('Deposits Money Successfully', done => {
        //     request.post('http://localhost:2011/deposit', {
        //         json: {
        //             amount: 1000
        //         }
        //     }, (_, response) => {
        //         expect(response.statusCode).to.equal(201)
        //         done()
        //     })
        // })
    })
})