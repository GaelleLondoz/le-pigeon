"use strict";

const faker = require("faker");
const {getHash} = require("../helpers/index")

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
        password: getHash("password"),
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
