const expect = require('chai').expect
const request = require('request')

describe('TRANSFER MONEY', () => {
    describe('TransferMoney', () => {
        describe('transfer money validation error', () => {
            describe('transfer missing field', () => {
                const payload = {
                    amount: 10
                }

                it('Status', done => {
                    request.post('http://localhost:2011/transfer', {
                        json: payload
                    }, (_, response) => {
                        expect(response.statusCode).to.equal(400)
                        done()
                    })
                })

                it('Message', done => {
                    request.post('http://localhost:2011/transfer', {
                        json: payload
                    }, (_, response) => {
                        expect(response.body.errors.firstName[0]).to.equal(`"receiver" is required`)
                        done()
                    })
                })
            })

            describe('Transfer money with improper fields', () => {
                const payload = {
                    amount: 0,
                    receiver: 1263475832
                }

                it('Status', done => {
                    request.post('http://localhost:2011/transfer', {
                        json: payload
                    }, (_, response) => {
                        expect(response.statusCode).to.equal(400)
                        done()
                    })
                })

                it('Message', done => {
                    request.post('http://localhost:2011/transfer', {
                        json: payload
                    }, (_, response) => {
                        expect(response.body.errors.firstName[0]).to.equal(`Please enter a valid amount to be transferred`)
                        done()
                    })
                })
            })
        })

        it('Transfers Money Successfully', done => {
            request.post('http://localhost:2011/transfer', {
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