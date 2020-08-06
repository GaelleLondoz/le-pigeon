"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("UserDestinations", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userID: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            destinationID: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "Destinations",
                    key: "id",
                },
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            remarks: {
                allowNull: true,
                type: Sequelize.TEXT,
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
        return queryInterface.dropTable("UserDestinations");
    },
};