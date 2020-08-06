"use strict";
const faker = require("faker");

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [];
        for (let i = 1; i <= 1; i++) {
            data.push({
                userID: 1,
                roleID: 3,
                price: 0,
                language: "French",
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        return queryInterface.bulkInsert("UserRoles", data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("UserRoles", null, {});
    },
};