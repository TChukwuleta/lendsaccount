const expect = require('chai').expect
const request = require('request')


describe('CREATE USER API', () => {
    describe('CreateUser', () => {
        describe('Create user validation error', () => {
            describe('Create user missing field', () => {
                const payload = {
                    firstname: "",
                    lastname: "Doe",
                    email: "johndoe@test.com",
                    password: "johndoe"
                }

                it('Status', done => {
                    request.post('http://localhost:2011/register', {
                        json: payload
                    }, (_, response) => {
                        expect(response.statusCode).to.equal(400)
                        done()
                    })
                })

                it('Message', done => {
                    request.post('http://localhost:2011/register', {
                        json: payload
                    }, (_, response) => {
                        expect(response.body.errors.firstName[0]).to.equal(`"firstname" is not allowed to be empty`)
                        done()
                    })
                })
            })

            describe("Create user invalid email field", () => {
                const payload = {
                    firstname: "john",
                    lastname: "Doe",
                    email: "johndoe",
                    password: "johndoe"
                }

                it('Status', done => {
                    request.post('http://localhost:2011/register', {
                        json: payload
                    }, (_, response) => {
                        expect(response.statusCode).to.equal(400)
                        done()
                    })
                })

                it('Message', done => {
                    request.post('http://localhost:2011/register', {
                        json: payload
                    }, (_, response) => {
                        expect(response.body.errors.firstName[0]).to.equal(`"email" must be a valid email`)
                        done()
                    })
                })
            })

            describe('Create user duplicate', () => {
                const payload = {
                    firstname: "John",
                    lastname: "Doe",
                    email: "johndoe@yopmail.com",
                    password: "johndoe"
                }

                it('Status', done => {
                    request.post('http://localhost:2011/register', {
                        json: payload
                    }, (_, response) => {
                        expect(response.statusCode).to.equal(400)
                        done()
                    })
                })

                it('Message', done => {
                    request.post('http://localhost:2011/register', {
                        json: payload
                    }, (_, response) => {
                        expect(response.body.errors.firstName[0]).to.equal(`User with these details already exists`)
                        done()
                    })
                })
            })
        })

        it('Creates a new user Successfully', done => {
            request.post('http://localhost:2011/register', {
                json: {
                    firstname: "Johne",
                    lastname: "Doee",
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