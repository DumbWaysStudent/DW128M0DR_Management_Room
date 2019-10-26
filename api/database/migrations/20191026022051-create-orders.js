'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      room_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'rooms',
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'customers',
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      duration: {
        type: Sequelize.INTEGER
      },
      order_end_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      is_done: {
        type: Sequelize.BOOLEAN
      },
      is_booked: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};