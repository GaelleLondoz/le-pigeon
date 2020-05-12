"use strict";
module.exports = (sequelize, DataTypes) => {
  const Destination = sequelize.define(
    "Destination",
    {
      countryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      continentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coverImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {}
  );
  Destination.associate = function (models) {
    // associations can be defined here
    Destination.belongsTo(models.Continent, {
      foreignKey: "continentID",
      allowNull: false,
    });
    Destination.belongsTo(models.Country, {
      foreignKey: "countryID",
      allowNull: false,
    });
    Destination.hasMany(models.UserDestination);
    Destination.hasMany(models.PictureDestination);
  };
  return Destination;
};
