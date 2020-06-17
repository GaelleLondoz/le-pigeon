"use strict";
module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define(
        "Message", {
            receiverID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            senderID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {}
    );
    Message.associate = function(models) {
        // associations can be defined here
        Message.belongsTo(models.User, {
            foreignKey: "receiverID",
            as: "receiver",
            allowNull: false,
        });
        Message.belongsTo(models.User, {
            foreignKey: "senderID",
            as: "sender",
            allowNull: false,
        });
    };
    return Message;
};