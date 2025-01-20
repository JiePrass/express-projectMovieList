module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Review", {
        rating: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        comment: { 
            type: DataTypes.TEXT 
        },
        movieId: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        userId: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
    });
};
