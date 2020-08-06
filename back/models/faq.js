'use strict';
module.exports = (sequelize, DataTypes) => {
  const Faq = sequelize.define('Faq', {
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  Faq.associate = function(models) {
    // associations can be defined here
  };
  return Faq;
};