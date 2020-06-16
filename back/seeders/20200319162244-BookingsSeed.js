"use strict";
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    const dataStatus = ["SEND", "ACCEPT", "CANCELLED"];
    const type = ["Face à Face au Pigeon", "Par Vidéo Conférence"];
    let count = 30;
    while (count--) {
      data.push({
        date: faker.date.future(1),
        status: faker.random.arrayElement(dataStatus),
        userID: faker.random.number({ min: 1, max: 15, precision: 1 }),
        agentID: faker.random.number({ min: 16, max: 30, precision: 1 }),
        type: faker.random.arrayElement(type),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("Bookings", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Bookings", null, {});
  },
};
