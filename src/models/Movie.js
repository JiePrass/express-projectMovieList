module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Movie", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        poster: {
            type: DataTypes.STRING,
            allowNull: true, // Opsional jika tidak wajib
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
                max: 5,
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });
};
