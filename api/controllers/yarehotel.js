const Sequelize = require('sequelize')
const models = require('../database/models')
const moment = require('moment')
Rooms = models.rooms
Customer = models.customers
Order = models.orders

module.exports = {
rooms:(req,res) => {
    Rooms.findAll()
    .then(data => res.send(data))
},

addRoom:(req, res) => {
    const {name} = req.body
    Rooms.create({
        name
    })
    .then(data => res.send(data))
},

editRoom:(req, res) => {
    const {room_id} = req.params
    const {name} = req.body
    Rooms.update({
        name
    },{
        where: { 
            id: room_id
        }
    })
    Rooms.findOne({
        where:{
            id:room_id
        }
    })
    .then(data => res.send(data))
},

customers:(req, res) => {
    Customer.findAll()
    .then(data => res.send(data))
},

addCustomer:(req,res) => {
    const {name, identity_number, phone_number,image} = req.body
    Customer.create({
        name,
        identity_number,
        phone_number,
        image
    })
    .then(data => res.send(data))
},

editCustomer:(req,res) => {
    const {customer_id} = req.params
    const {name, identity_number, phone_number,image} = req.body
    Customer.update({
        name,
        identity_number,
        phone_number,
        image
    },{
        where:{
            id:customer_id
        }
    })
    Customer.findOne({
        where:{
            id:customer_id
        }
    })
    .then(data => res.send(data))
},

checkin:(req,res) => {
    Order.findAll()
    .then(data => res.send(data))
},

addChicken:(req, res) => {
    const {room_id, customer_id, duration, is_done, is_booked} = req.body
    const createdAt = res.createdAt
    Order.create({
        room_id,
        customer_id,
        duration,
        order_end_time : moment(createdAt).add((duration*22), 'hours').format('YYYY-MM-DD hh:mm'),
        is_done,
        is_booked
    })
    .then(data => res.send(data))
}
} //this is end of exports