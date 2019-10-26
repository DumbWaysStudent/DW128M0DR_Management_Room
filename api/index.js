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
    router.put('/room/:room_id', authenticated, Yarehotel.editRoom)
    
    router.get('/customers', authenticated, Yarehotel.customers)
    router.post('/customer', authenticated, Yarehotel.addCustomer)
    router.put('/customer/:customer_id', authenticated, Yarehotel.editCustomer)

    router.get('/checkin', authenticated, Yarehotel.checkin)
    router.post('/checkin', authenticated, Yarehotel.addCheckin)
    router.put('/order/:order_id', authenticated, Yarehotel.editCheckin)
})


app.listen(port, () => console.log(`Listening on port ${port}!`))