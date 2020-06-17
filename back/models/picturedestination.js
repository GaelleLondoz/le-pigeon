"use strict";
module.exports = (sequelize, DataTypes) => {
    const PictureDestination = sequelize.define(
        "PictureDestination", {
            userID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            destinationID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            path: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            alt: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        }, {}
    );
    PictureDestination.associate = function(models) {
        // associations can be defined here
        PictureDestination.belongsTo(models.User, {
            foreignKey: "userID",
            allowNull: false,
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        });
        PictureDestination.belongsTo(models.Destination, {
            foreignKey: "destinationID",
            allowNull: false,
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        });
    };
    return PictureDestination;
};