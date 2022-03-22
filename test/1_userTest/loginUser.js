const expect = require('chai').expect
const request = require('request')


describe('LOGIN USER API', () => {
    describe('LoginUser', () => {
        describe('Login user validation error', () => {
            describe('Login user missing field', () => {
                const payload = {
                    email: "",
                    password: "johndoe"
                }

                it('Status', done => {
                    request.post('http://localhost:2011/login', {
                        json: payload
                    }, (_, response) => {
                        expect(response.statusCode).to.equal(400)
                        done()
                    })
                })

                it('Message', done => {
                    request.post('http://localhost:2011/login', {
                        json: payload
                    }, (_, response) => {
                        expect(response.body.errors.firstName[0]).to.equal(`"email" is not allowed to be empty`)
                        done()
                    })
                })
            })

            describe("Login user invalid email field", () => {
                const payload = {
                    email: "johndoe",
                    password: "johndoe"
                }

                it('Status', done => {
                    request.post('http://localhost:2011/login', {
                        json: payload
                    }, (_, response) => {
                        expect(response.statusCode).to.equal(400)
                        done()
                    })
                })

                it('Message', done => {
                    request.post('http://localhost:2011/login', {
                        json: payload
                    }, (_, response) => {
                        expect(response.body.errors.firstName[0]).to.equal(`"email" must be a valid email`)
                        done()
                    })
                })
            })

        })

        it('Logs in a user Successfully', done => {
            request.post('http://localhost:2011/login', {
                json: {
                    email: "johndoeee@yopmail.com",
                    password: "johndoee"
                }
            }, (_, response) => {
                expect(response.statusCode).to.equal(201)
                done()
            })
        })
    })
})