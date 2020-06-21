"use strict";
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    for (let i = 1; i <= 30; i++) {
      data.push({
        userID: i,
        roleID: faker.random.number({ min: 1, max: 3, precision: 1 }),
        price: faker.commerce.price(10, 20, 2),
        language: "French",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("UserRoles", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UserRoles", null, {});
  },
};
