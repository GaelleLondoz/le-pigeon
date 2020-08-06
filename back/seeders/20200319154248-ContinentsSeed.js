"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Continents",
      [
        {
          name: "Amérique du Nord",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Amérique du Sud",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Antarctique",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Asie",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Europe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Afrique",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Océanie",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Continents", null, {});
  },
};
