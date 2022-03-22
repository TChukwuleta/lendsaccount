const request = require('supertest')
const appServer = require('../../app')


describe('CREATE USER API', () => {
        describe('Create user validation error', () => {
            it('Returns a 400 response as firstname is empty', async () => {
                await request(appServer).post('/register').send({
                    firstname: "",
                    lastname: "Doe",
                    email: "johndoe@test.com",
                    password: "johndoe"
                })
                .expect(400)
            })

            it('Returns a 400 response as email input is wrong', async () => {
                await request(appServer).post('/register').send({
                    firstname: "john",
                    lastname: "Doe",
                    email: "johndoe",
                    password: "johndoe"
                })
                .expect(400)
            })

            it('Returns a 400 response as there is a duplicate user', async () => {
                await request(appServer).post('/register').send({
                    firstname: "John",
                    lastname: "Doe",
                    email: "johndoe@yopmail.com",
                    password: "johndoe"
                })
                .expect(400)
            })
        })

        it('Creates a new user Successfully', async () => {
            await request(appServer).post('/register').send({
                firstname: "Johne",
                lastname: "Doee",
                email: "johndoeee@yopmail.com",
                password: "johndoee"
            })
            // .expect(201)
        })
})