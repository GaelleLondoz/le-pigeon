'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    'City', 
    {
      name: { //
        type: DataTypes.STRING, //
        allowNull: false //
      } //
    }, 
    {}
  );
  City.associate = function(models) {
    // associations can be defined here
    City.hasMany(models.Destination,{foreignKey : 'id'}); //
  };
  return City;
};


