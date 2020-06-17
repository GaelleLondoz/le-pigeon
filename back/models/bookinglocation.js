"use strict";
module.exports = (sequelize, DataTypes) => {
    const BookingLocation = sequelize.define(
        "BookingLocation", {
            bookingID: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            locationID: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
        }, {}
    );
    BookingLocation.associate = function(models) {
        // associations can be defined here
        BookingLocation.belongsTo(models.Booking, {
            foreignKey: "bookingID",
            allowNull: false,
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        });
        BookingLocation.belongsTo(models.Location, {
            foreignKey: "locationID",
            allowNull: false,
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        });
    };
    return BookingLocation;
};