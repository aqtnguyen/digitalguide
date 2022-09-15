module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    tourId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    touristId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    touristName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviewText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviewRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
  return Review;
};
