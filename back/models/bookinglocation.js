'use strict';
module.exports = (sequelize, DataTypes) => {
  const BookingLocation = sequelize.define('BookingLocation', {
    bookingId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    locationId: {
      allowNull: false,
      type: DataTypes.INTEGER}
  }, {});
  BookingLocation.associate = function(models) {
    // associations can be defined here
    BookingLocation.belongsTo(models.Booking, {
      foreignKey: 'bookingID',
      allowNull:false
    });
    BookingLocation.belongsTo(models.Location, {
      foreignKey: 'locationID',
      allowNull:false
    });
  };
  return BookingLocation;
};