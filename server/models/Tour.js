module.exports = (sequelize, DataTypes) => {
  const Tour = sequelize.define("Tour", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tourText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashtag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distance: {
      type: DataTypes.FLOAT,
    },
    duration: {
      type: DataTypes.FLOAT,
    },
    counter: {
      type: DataTypes.INTEGER,
    },
    tourImg: {
      type: DataTypes.STRING,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  //Relation definition
  // Tour.associate = (models) => {
  //   Tour.hasMany(models.Tourcontent, {
  //     onDelete: "cascade",
  //   });
  // };

  return Tour;
};
