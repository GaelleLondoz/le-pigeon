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
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      agentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Booking.associate = function (models) {
    // associations can be defined here
    // Booking.belongsTo(models.User, {
    //   foreignKey: "id",
    //   allowNull: false,
    // });
    Booking.belongsTo(models.User, {
      foreignKey: "userID",
      targetKey: "id",
      as: "user",
      allowNull: false,
    });
    Booking.belongsTo(models.User, {
      foreignKey: "agentID",
      senderId: "id",
      as: "agent",
      allowNull: false,
    });
    //Association with Location
    Booking.hasMany(models.BookingLocation);
  };
  return Booking;
};
