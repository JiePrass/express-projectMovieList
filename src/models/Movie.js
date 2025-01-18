module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define("Movie", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        director: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });

    return Movie;
};
