module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define("Quiz", {
    question: {
      type: DataTypes.STRING,
    },
    answer1: {
      type: DataTypes.STRING,
    },
    answer2: {
      type: DataTypes.STRING,
    },
    answer3: {
      type: DataTypes.STRING,
    },
    poiId: {
      type: DataTypes.INTEGER,
    },
  });
  return Quiz;
};
