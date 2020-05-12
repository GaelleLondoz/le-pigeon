"use strict";
const faker = require("faker");
const coverImages = [
  "https://cdn.pixabay.com/photo/2016/09/19/07/01/lake-irene-1679708__340.jpg",
  "https://cdn.pixabay.com/photo/2014/01/04/12/34/street-238458__340.jpg",
  "https://cdn.pixabay.com/photo/2016/08/16/17/12/rotterdam-1598418__340.jpg",
  "https://cdn.pixabay.com/photo/2013/05/28/20/30/city-114290__340.jpg",
  "https://cdn.pixabay.com/photo/2019/03/31/14/38/holland-4093234__340.jpg",
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let count = 30;
    while (count--) {
      data.push({
        countryID: faker.random.number({ min: 1, max: 15, precision: 1 }),
        continentID: faker.random.number({ min: 1, max: 7, precision: 1 }),
        name: faker.lorem.sentence(3),
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
