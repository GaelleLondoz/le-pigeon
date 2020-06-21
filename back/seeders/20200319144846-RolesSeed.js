"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "ROLE_USER",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ROLE_AGENT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ROLE_COMMUNAUTE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Roles", null, {});
  },
};
