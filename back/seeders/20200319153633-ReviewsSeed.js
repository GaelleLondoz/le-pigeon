
"use strict";
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    const dataStatus = ["PENDING", "PUBLISHED", "NOT PUBLISHED"];
    for (let i = 1; i <= 30; i++) {
      data.push({
        agentID: i,
        authorID: faker.random.number({ min: 11, max: 30, precision: 1 }),
        comment: faker.lorem.sentence(30),
        rating: faker.random.number({ min: 1, max: 5, precision: 1 }),
        status: faker.random.arrayElement(dataStatus),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("Reviews", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Reviews", null, {});
  },
};
