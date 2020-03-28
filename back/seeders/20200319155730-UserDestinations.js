"use strict";
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let count = 20;
    while (count--) {
      data.push({
        userID: faker.random.number({ min: 1, max: 30, precision: 1 }),
        destinationID: faker.random.number({ min: 1, max: 30, precision: 1 }),
        date: faker.date.past(1),
        remarks: faker.lorem.sentence(40),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert("UserDestinations", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UserDestinations", null, {});
  }
};
