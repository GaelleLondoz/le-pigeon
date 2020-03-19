"use strict";
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let count = 30;
    while (count--) {
      data.push({
        countryID: faker.random.number({ min: 1, max: 15, precision: 1 }),
        continentID: faker.random.number({ min: 1, max: 7, precision: 1 }),
        name: faker.lorem.sentence(3),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert("Destinations", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Destinations", null, {});
  }
};
