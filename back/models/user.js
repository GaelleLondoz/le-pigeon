"use strict";
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User", {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            isAgent: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        }, {}
    );
    User.associate = function(models) {
        // associations can be defined here
        User.hasMany(models.Booking, {
            foreignKey: "id",
        });
        User.hasMany(models.Review, {
            foreignKey: "id",
            as: "reviews",
        });
        User.hasMany(models.Message, {
            foreignKey: "id",
        });
        User.hasMany(models.UserDestination);
        User.hasMany(models.PictureDestination);
        User.hasMany(models.UserRole);
    };

    return User;
};