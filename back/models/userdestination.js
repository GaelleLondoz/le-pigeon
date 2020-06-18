"use strict";
module.exports = (sequelize, DataTypes) => {
    const UserDestination = sequelize.define(
        "UserDestination", {
            userID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            destinationID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            remarks: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        }, {}
    );
    UserDestination.associate = function(models) {
        // associations can be defined here
        UserDestination.belongsTo(models.User, {
            foreignKey: "userID",
            allowNull: false,
        });
        UserDestination.belongsTo(models.Destination, {
            foreignKey: "destinationID",
            allowNull: false,
        });
    };
    return UserDestination;
};