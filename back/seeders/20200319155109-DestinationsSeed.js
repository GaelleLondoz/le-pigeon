"use strict";
const faker = require("faker");
const coverImages = [
  "8gnGjHRiAi.jpeg",
  "irm9GOgwfs.jpeg",
  "mJn1sDw9qs.jpeg",
  "x71mUNxK5K.jpeg",
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let count = 30;
    while (count--) {
      data.push({
        // countryID: faker.random.number({ min: 1, max: 15, precision: 1 }),
        // continentID: faker.random.number({ min: 1, max: 7, precision: 1 }),
        name: faker.lorem.sentence(3),
        lat: faker.address.latitude(),
        lng: faker.address.longitude(),
        coverImage: faker.random.arrayElement(coverImages),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("Destinations", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Destinations", null, {});
  },
};
