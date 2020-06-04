"use strict";
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let count = 15;
    while (count--) {
      data.push({
        name: faker.address.country(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("Countries", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Countries", null, {});
  },
};
