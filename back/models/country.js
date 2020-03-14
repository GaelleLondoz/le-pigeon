'use strict';
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    name: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Country.associate = function(models) {
    // associations can be defined here
  };
  return Country;
};