const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");
const upload = require('../middlewares/upload')
const movieController = require("../controllers/movieController");

// Routes untuk CRUD movie
router.post("/", authMiddleware, isAdminMiddleware, upload.single('poster'), movieController.createMovie);
router.get("/",  authMiddleware, movieController.getAllMovies);
router.get("/:id", authMiddleware, movieController.getMovieById);
router.patch("/:id", authMiddleware, isAdminMiddleware, upload.single('poster'), movieController.updateMovie);
router.delete("/:id", authMiddleware, isAdminMiddleware, movieController.deleteMovie);
router.post("/:movieId/review", authMiddleware, movieController.createReview);

module.exports = router;
