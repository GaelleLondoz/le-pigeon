"use strict";
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let count = 30;
    while (count--) {
      data.push({
        userID: faker.random.number({ min: 1, max: 30, precision: 1 }),
        destinationID: faker.random.number({ min: 1, max: 30, precision: 1 }),
        path: faker.image.imageUrl(400, 300),
        name: faker.lorem.sentence(3),
        alt: faker.lorem.sentence(20),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert("PictureDestinations", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PictureDestinations", null, {});
  }
};
