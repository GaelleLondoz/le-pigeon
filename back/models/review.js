'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false},

    comment: {
      type: DataTypes.TEXT,
      allowNull: false},

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false}
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      allowNull: false
    })
  };
  return Review;
};