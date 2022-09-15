module.exports = (sequelize, DataTypes) => {
  const Poi = sequelize.define("Poi", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poiText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashtag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    counter: {
      type: DataTypes.INTEGER,
    },
    poiImg: {
      type: DataTypes.STRING,
    },
    tourTitle: {
      type: DataTypes.STRING,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tourId: {
      type: DataTypes.INTEGER,
    },
  });

  //Relation definition
  // Tour.associate = (models) => {
  //   Tour.hasMany(models.Tourcontent, {
  //     onDelete: "cascade",
  //   });
  // };

  return Poi;
};
