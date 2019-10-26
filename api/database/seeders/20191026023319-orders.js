'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('orders', [
        {
          room_id : 1,
          customer_id : 1,
          duration : 10,
          order_end_time: "2019-10-21 02:29",
          is_done:false,
          is_booked : true,
          createdAt: "2019-10-10 08:31",
          updatedAt: "2019-10-10 08:31"
        },
        {
          room_id : 2,
          customer_id : 2,
          duration : 10,
          order_end_time: "2019-10-21 02:29",
          is_done:false,
          is_booked : true,
          createdAt: "2019-10-10 08:31",
          updatedAt: "2019-10-10 08:31"
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
