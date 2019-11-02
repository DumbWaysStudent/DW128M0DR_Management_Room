'use strict';
module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define('customers', {
    name: DataTypes.STRING,
    identity_number: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  customers.associate = function(models) {
    // customers.belongsToMany(models.rooms,{
    //   through:models.orders,
    //   foreignKey:'customer_id'
    // })
    customers.hasMany(models.orders,{
      as:'orders',
      foreignKey:'customer_id'
    })
  };
  return customers;
};