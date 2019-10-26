const express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes')

const app = express()
const port = 9090

app.use(bodyParser.json())

//controllers
const AuthController = require('./controllers/auth')
const Yarehotel = require('./controllers/yarehotel')

//middlewares
const { authenticated } = require('./middleware')

app.group("/api/v2", (router) => { 
    router.post('/signin', AuthController.signin)

    router.get('/rooms', authenticated, Yarehotel.rooms)
    router.post('/room', authenticated, Yarehotel.addRoom)
})


app.listen(port, () => console.log(`Listening on port ${port}!`))