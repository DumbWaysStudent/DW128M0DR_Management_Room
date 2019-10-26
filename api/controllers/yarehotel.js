const Sequelize = require('sequelize')
const models = require('../database/models')
Rooms = models.rooms

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
}
} //this is end of exports