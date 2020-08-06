"use strict";
module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define(
        "UserRole", {
            userID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            roleID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            language: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {}
    );
    UserRole.associate = function(models) {
        // associations can be defined here
        UserRole.belongsTo(models.User, {
            foreignKey: "userID",
            allowNull: false,
        });
        UserRole.belongsTo(models.Role, {
            foreignKey: "roleID",
            allowNull: false,
        });
    };
    return UserRole;
};