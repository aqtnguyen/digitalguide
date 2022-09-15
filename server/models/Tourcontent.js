module.exports = (sequelize, DataTypes) => {
  const Tourcontent = sequelize.define("Tourcontent", {
    row: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Tourcontent;
};
