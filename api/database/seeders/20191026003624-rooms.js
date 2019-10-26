'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('rooms', [
      {
        name: 'A1', 
        createdBy:1,
        createdAt: "2019-10-10 08:31",
        updatedAt: "2019-10-10 08:31"
      },
      {
        name: 'A2',
        createdBy:1,
        createdAt: "2019-10-10 08:31",
        updatedAt: "2019-10-10 08:31"
      },
      {
        name: 'A3',
        createdBy:1,
        createdAt: "2019-10-10 08:31",
        updatedAt: "2019-10-10 08:31"
      },
      {
        name: 'A4',
        createdBy:1,
        createdAt: "2019-10-10 08:31",
        updatedAt: "2019-10-10 08:31"
      },

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
