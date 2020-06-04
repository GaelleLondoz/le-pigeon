// "use strict";
// const faker = require("faker");

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     let data = [];
//     for (let i = 1; i <= 30; i++) {
//       data.push({
//         userID: i,
//         comment: faker.lorem.sentence(30),
//         rating: faker.random.number({ min: 1, max: 5, precision: 1 }),
//         createdAt: new Date(),
//         updatedAt: new Date()
//       });
//     }
//     return queryInterface.bulkInsert("Reviews", data, {});
//   },

//   down: (queryInterface, Sequelize) => {
//     return queryInterface.bulkDelete("Reviews", null, {});
//   }
// };

//Seeders from feature_review gaelle

"use strict";
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    for (let i = 1; i <= 30; i++) {
      data.push({
        agentID: i,
        authorID: faker.random.number({ min: 11, max: 30, precision: 1 }),
        comment: faker.lorem.sentence(30),
        rating: faker.random.number({ min: 1, max: 5, precision: 1 }),
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
