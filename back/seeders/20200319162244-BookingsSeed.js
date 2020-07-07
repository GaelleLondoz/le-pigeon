"use strict";
const faker = require("faker");

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [];
        const dataStatus = ["PENDING", "ACCEPTED", "CANCELLED"];
        const bookingType = ["Face à face", "Par vidéo conférence"];
        let count = 30;
        while (count--) {
            data.push({
                date: faker.date.future(1),
                status: faker.random.arrayElement(dataStatus),
                comment: faker.lorem.sentence(30),
                userID: faker.random.number({ min: 1, max: 15, precision: 1 }),
                agentID: faker.random.number({ min: 16, max: 30, precision: 1 }),
                createdAt: new Date(),
                updatedAt: new Date(),
                type: faker.random.arrayElement(bookingType),
            });
        }
        return queryInterface.bulkInsert("Bookings", data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Bookings", null, {});
    },
};