const expect = require('chai').expect
const request = require('supertest')
const appServer = require('../../app')


describe('LOGIN USER API', () => {
    describe('LoginUser', () => {
        describe('Login user validation error', () => {
            describe('Login user missing field', () => {
                it('Returns a 400 response as email is empty', async () => {
                    await request(appServer).post('/login').send({
                        email: "",
                        password: "johndoe"
                    })
                    .expect(400)
                })
            })

            describe("Login user invalid email field", () => {
                it('Returns a 400 response as email input is wrong', async () => {
                    await request(appServer).post('/login').send({
                        email: "johndoe",
                        password: "johndoe"
                    })
                    .expect(400)
                })
            })

        })

        it('Logs in a user Successfully', async () => {
            await request(appServer).post('/login').send({
                email: "johndoeee@yopmail.com",
                password: "johndoee"
            })
            expect(201)
        })
    })
})