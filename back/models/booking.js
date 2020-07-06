"use strict";
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "PENDING",
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        //defaultValue: 2,
      },
      agentID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        //defaultValue: 2,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {}
  );
  Booking.associate = function (models) {
    // associations can be defined here
    Booking.belongsTo(models.User, {
      foreignKey: "userID",
      allowNull: false,
      as: "booker",
    });
    Booking.belongsTo(models.User, {
      foreignKey: "agentID",
      allowNull: false,
      as: "agent",
    });
    //Association with Location
    Booking.hasMany(models.BookingLocation);
  };
  return Booking;
};
