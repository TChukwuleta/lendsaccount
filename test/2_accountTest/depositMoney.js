const expect = require('chai').expect
const request = require('request')

describe('DEPOSIT MONEY', () => {
    describe('DepositMoney', () => {
        describe('deposit money validation error', () => {
            describe('Deposit with improper field', () => {
                const payload = {
                    amount: 0
                }

                it('Status', done => {
                    request.post('http://localhost:2011/deposit', {
                        json: payload
                    }, (_, response) => {
                        expect(response.statusCode).to.equal(400)
                        done()
                    })
                })

                it('Message', done => {
                    request.post('http://localhost:2011/deposit', {
                        json: payload
                    }, (_, response) => {
                        expect(response.body.errors.firstName[0]).to.equal(`Please enter a valid amount to be deposited`)
                        done()
                    })
                })
            })
        })

        it('Deposits Money Successfully', done => {
            request.post('http://localhost:2011/deposit', {
                json: {
                    amount: 1000
                }
            }, (_, response) => {
                expect(response.statusCode).to.equal(201)
                done()
            })
        })
    })
})