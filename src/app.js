require('dotenv').config();
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movie");

const express = require("express");
const path = require("path");
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

// Acces Poster
app.use('/posters', express.static(path.join(__dirname, '..' ,'public', 'posters')));
const postersPath = path.join(__dirname, 'public/posters');
console.log('Static folder for posters:', postersPath);

// Routes
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
