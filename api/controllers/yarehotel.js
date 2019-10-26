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
}
} //this is end of exports