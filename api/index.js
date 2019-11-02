const express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes')

const app = express()
const port = 8090

app.use(bodyParser.json())
 
//controllers
const AuthController = require('./controllers/auth')
const Yarehotel = require('./controllers/yarehotel')

//middlewares
const { authenticated } = require('./middleware')

app.group("/api/v2", (router) => { 
    router.post('/signin', AuthController.signin)
 
    router.get('/rooms', Yarehotel.rooms)
    router.post('/room', Yarehotel.addRoom)
    router.put('/room/:room_id', Yarehotel.editRoom)
    
    router.get('/customers', Yarehotel.customers)
    router.post('/customer', Yarehotel.addCustomer)
    router.put('/customer/:customer_id', Yarehotel.editCustomer)
    router.get('/customers/search', Yarehotel.search)

    router.get('/checkin', Yarehotel.checkin)
    router.post('/checkin', Yarehotel.addCheckin)
    router.put('/order/:order_id', Yarehotel.editCheckin)
})


app.listen(port, () => console.log(`Listening on port ${port}!`))