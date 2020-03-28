"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("BookingLocations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookingID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Bookings",
          key: "id"
        }
      },
      locationID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Locations",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("BookingLocations");
  }
};
