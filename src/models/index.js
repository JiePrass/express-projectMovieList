const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

// Impor model
const User = require("./User")(sequelize, DataTypes);
const Movie = require("./Movie")(sequelize, DataTypes);
const Review = require("./Review")(sequelize, DataTypes);

// Definisikan relasi antar tabel
User.hasMany(Review, { foreignKey: "userId", as: "reviews" });
Review.belongsTo(User, { foreignKey: "userId", as: "user" });

Movie.hasMany(Review, { foreignKey: "movieId", as: "reviews" });
Review.belongsTo(Movie, { foreignKey: "movieId", as: "movie" });

// Sinkronisasi database
sequelize
    .sync()
    .then(() => console.log("Database synchronized"))
    .catch((error) => console.log("Error syncing database:", error));

// Ekspor semua model dan koneksi
module.exports = { sequelize, User, Movie, Review };
