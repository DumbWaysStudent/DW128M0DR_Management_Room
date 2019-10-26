const Sequelize = require('sequelize')
const models = require('../database/models')
Rooms = models.rooms

module.exports = {
Rooms:(req,res) => {
    Rooms.findAll()
         .then(data => res.send(data))
}
} //this is end of exports