module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("Image", {
      imgTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tourId: {
        type: DataTypes.INTEGER,
      },
      poiId: {
        type: DataTypes.INTEGER,
      }
    });
    return Image;
  };