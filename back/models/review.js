// "use strict";
// module.exports = (sequelize, DataTypes) => {
//   const Review = sequelize.define(
//     "Review",
//     {
//       userID: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//       },

//       comment: {
//         type: DataTypes.TEXT,
//         allowNull: false
//       },

//       rating: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//       }
//     },
//     {}
//   );
//   Review.associate = function(models) {
//     // associations can be defined here
//     Review.belongsTo(models.User, {
//       foreignKey: "userID",
//       allowNull: false
//     });
//   };
//   return Review;
// };

//Model from feature_review gaelle
"use strict";
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      agentID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      authorID: {

        type: DataTypes.INTEGER,
        allowNull: false,
      },

      authorID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Review.associate = function (models) {
    // associations can be defined here

    Review.belongsTo(models.User, { foreignKey: 'agentID', targetKey: 'id', as: 'agent', allowNull: false });
    Review.belongsTo(models.User, { foreignKey: 'authorID', targetKey: 'id', as: 'author', allowNull: false });
  };
  return Review;
};
