"use strict";
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    for (let i = 1; i <= 30; i++) {
      data.push({
        bookingID: i,
        locationID: faker.random.number({ min: 1, max: 20, precision: 1 }),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert("BookingLocations", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("BookingLocations", null, {});
  }
};
