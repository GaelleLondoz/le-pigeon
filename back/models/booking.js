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
        allowNull: false,
        defaultValue: "PENDING",
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      agentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        //defaultValue: 2,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
