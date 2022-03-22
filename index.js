const appServer = require('./app')

const port = process.env.PORT || 2011
appServer.listen(port, () => {
    console.log(`App is up and running on port ${port}`)
})