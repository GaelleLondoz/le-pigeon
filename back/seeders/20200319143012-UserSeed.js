"use strict";

const faker = require("faker");
const { getHash } = require("../helpers/index");

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [];
        let count = 1;

        while (count--) {
            data.push({
                firstName: "admin",
                lastName: "admin",
                userName: "admin",
                email: "admin@pigeon.com",
                password: getHash("password"),
                avatar: "n949NmPh02.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
                isAgent: false,
            });
        }
        return queryInterface.bulkInsert("Users", data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Users", null, {});
    },
};