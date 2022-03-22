// const expect = require('chai').expect
// const request = require('request')

// describe('WITHDRAW MONEY', () => {
//     describe('WithdrawMoney', () => {
//         describe('Withdraw money validation error', () => {
//             describe('Withdraw money with improper fields', () => {
//                 const payload = {
//                     amount: 0
//                 }

//                 it('Status', done => {
//                     request.post('http://localhost:2011/withdraw', {
//                         json: payload
//                     }, (_, response) => {
//                         expect(response.statusCode).to.equal(400)
//                         done()
//                     })
//                 })

//                 it('Message', done => {
//                     request.post('http://localhost:2011/withdraw', {
//                         json: payload
//                     }, (_, response) => {
//                         expect(response.body.errors.firstName[0]).to.equal(`Please enter a valid amount to be withdrawn`)
//                         done()
//                     })
//                 })
//             })
//         })

//         it('Withdraws Money Successfully', done => {
//             request.post('http://localhost:2011/withdraw', {
//                 json: {
//                     amount: 1000
//                 }
//             }, (_, response) => {
//                 expect(response.statusCode).to.equal(201)
//                 done()
//             })
//         })
//     })
// })