"use strict";

<<<<<<< HEAD
/* https://www.npmjs.com/package/faker */
=======
>>>>>>> feee8368aa8d514277d2e65f09b884fbe814f324
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let count = 30;

    while (count--) {
      data.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: "password",
        avatar: faker.image.avatar(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert("Users", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
