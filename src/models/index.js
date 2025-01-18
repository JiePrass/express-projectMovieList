const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const User = require("./User")(sequelize, DataTypes);
const Movie = require("./Movie")(sequelize, DataTypes);
// const Review = require("./Review")(sequelize, DataTypes);

sequelize.sync()
    .then(() => console.log("Database synchronized"))
    .catch((error) => console.log("Error syncing database:", error));

// Relasi antar tabel
// User.hasMany(Review, { foreignKey: "userId" });
// Review.belongsTo(User, { foreignKey: "userId" });

// Movie.hasMany(Review, { foreignKey: "movieId" });
// Review.belongsTo(Movie, { foreignKey: "movieId" });

module.exports = { sequelize, User, Movie};
