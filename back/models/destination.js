"use strict";
module.exports = (sequelize, DataTypes) => {
  const Destination = sequelize.define(
    "Destination",
    {
      // countryID: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // continentID: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coverImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lng: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      type: {
        //type: DataTypes.STRING,
        allowNull: false,
        type: DataTypes.ENUM(
          "Plage",
          "Montagne",
          "City-trip",
          "Road-trip",
          "Backpack",
          "Hotel",
          "Clubmed",
          "Slow-travel",
          "Tour du monde",
          "Croisières",
          "Trek",
          "Camping"
        ),
        //defaultValue: 'employee'
      },
    },
    {}
  );
  Destination.associate = function (models) {
    // associations can be defined here
    // Destination.belongsTo(models.Continent, {
    //   foreignKey: "continentID",
    //   allowNull: false,
    // });
    // Destination.belongsTo(models.Country, {
    //   foreignKey: "countryID",
    //   allowNull: false,
    // });
    Destination.hasMany(models.UserDestination);
    Destination.hasMany(models.PictureDestination);
  };
  return Destination;
};
