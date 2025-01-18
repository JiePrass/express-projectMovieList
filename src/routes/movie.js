const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const movieController = require("../controllers/movieController");

// Routes untuk CRUD movie
router.post("/", authMiddleware, movieController.createMovie); // Admin only
router.get("/", movieController.getAllMovies); // Semua orang bisa melihat semua movie
router.get("/:id", movieController.getMovieById); // Semua orang bisa melihat detail movie
router.patch("/:id", authMiddleware, movieController.updateMovie); // Admin only
router.delete("/:id", authMiddleware, movieController.deleteMovie); // Admin only

module.exports = router;
