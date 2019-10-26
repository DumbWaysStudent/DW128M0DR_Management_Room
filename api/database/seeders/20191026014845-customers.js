'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('customers', [
        {
          name:"Dedek Isgi",
          identity_number:"1234567890",
          phone_number: "+62 8123-4567-789",
          image: "https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png",
          createdAt: "2019-10-10 08:31",
          updatedAt: "2019-10-10 08:31"
        },
        {
          name:"Najib Tingi",
          identity_number:"14286",
          phone_number: "+62 8123-4567-789",
          image: "https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png",
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
