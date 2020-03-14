'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false},

    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false},

    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User, {
      foreignKey: 'receiverID',
      foreignKey: 'senderID',
      allowNull: false
    })
  };
  return Message;
};