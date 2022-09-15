module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define("Favorite", {
        touristId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tourId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return Favorite;
};
