
"use strict";
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    const dataCategory = [1, 2, 3];
    for (let i = 1; i <= 30; i++) {
      data.push({
        categoryID: faker.random.arrayElement(dataCategory),
        question: faker.lorem.sentence(20),
        answer: faker.lorem.sentence(50),
        featured: faker.random.boolean(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("Faqs", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Faqs", null, {});
  },
};


