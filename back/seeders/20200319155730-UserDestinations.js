"use strict";
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    for (let i = 1; i <= 30; i++) {
      data.push({
        userID: faker.random.number({ min: 1, max: 30, precision: 1 }),
        destinationID: i,
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
