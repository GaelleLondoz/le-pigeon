"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Destinations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      countryID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Countries",
          key: "id",
        },
      },
      continentID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Continents",
          key: "id",
        },
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      coverImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Destinations");
  },
};
