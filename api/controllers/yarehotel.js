const Sequelize = require('sequelize')
const models = require('../database/models')
Rooms = models.rooms
Customer = models.customers

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
}
} //this is end of exports