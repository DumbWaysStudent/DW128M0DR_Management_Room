'use strict';
module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define('rooms', {
    name: DataTypes.STRING,
    createdBy: DataTypes.INTEGER
  }, {});
  rooms.associate = function(models) {
    rooms.belongsTo(models.user,{
      foreignKey:'createdBy'
    })
  };
  return rooms;
};