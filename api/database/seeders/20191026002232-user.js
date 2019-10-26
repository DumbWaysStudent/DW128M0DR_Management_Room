'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [
        {
          email:'1@mo.mo',
          password:'1',
          name:'Rendi WIjiatmoko',
          createdAt: "2019-10-10 08:31",
          updatedAt: "2019-10-10 08:31"
        },
        {
          email:'2@mo.mo',
          password:'1',
          name:'Ellysian',
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
