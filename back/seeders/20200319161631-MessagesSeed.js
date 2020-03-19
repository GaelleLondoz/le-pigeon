"use strict";
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    const dataStatus = ["SEND", "READ", "CANCELLED"];
    let count = 30;
    while (count--) {
      data.push({
        receiverID: faker.random.number({ min: 1, max: 10, precision: 1 }),
        senderID: faker.random.number({ min: 11, max: 30, precision: 1 }),
        content: faker.lorem.sentence(50),
        status: faker.random.arrayElement(dataStatus),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert("Messages", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Messages", null, {});
  }
};
