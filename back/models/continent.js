"use strict";
module.exports = (sequelize, DataTypes) => {
  const Continent = sequelize.define(
    "Continent",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Continent.associate = function(models) {
    // associations can be defined here
    Continent.hasMany(models.Destination);
  };
  return Continent;
};
