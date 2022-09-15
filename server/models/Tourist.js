module.exports = (sequelize, DataTypes) => {
  const Tourist = sequelize.define("Tourist", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  });

  return Tourist;
};
