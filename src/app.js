require('dotenv').config();
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movie")

const express = require("express");
const PORT = process.env.PORT

const app = express();

app.use(express.json());

// Routes
app.use("/auth", authRoutes)
app.use("/movies", movieRoutes)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
