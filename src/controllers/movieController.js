const {Movie, User, Review} = require("../models");

// Create a new movie (Admin only)
exports.createMovie = async (req, res) => {
    const { title, director, genre, rating, description } = req.body;
    const poster = req.file ? req.file.filename : null; // Dapatkan nama file poster

    try {
        const newMovie = await Movie.create({ title, director, genre, rating, description, poster });
        res.status(201).json({ message: "Movie created successfully!", movie: newMovie });
    } catch (error) {
        res.status(500).json({ message: "Error creating movie", error });
    }
};

// Get all movies (For all users)
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        const moviesWithPosterUrl = movies.map(movie => ({
            ...movie.toJSON(),
            poster: movie.poster ? `${req.protocol}://${req.get('host')}/posters/${movie.poster}` : null,
        }));

        res.status(200).json(moviesWithPosterUrl);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving movies", error });
    }
};

// Get movie by ID (For all users)
exports.getMovieById = async (req, res) => {
    const { id } = req.params;

    try {
        // Menambahkan relasi Review dan User (untuk mengambil username)
        const movie = await Movie.findByPk(id, {
            include: [
                {
                    model: Review,
                    as: 'reviews',
                    include: [
                        {
                            model: User,  // Memasukkan informasi user (username)
                            as: 'user',   // Alias yang sudah Anda tentukan di relasi
                            attributes: ['username']  // Hanya ambil username
                        }
                    ]
                }
            ]
        });

        if (!movie) {
            return res.status(404).json({ message: "Movie not found!" });
        }

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving movie", error });
    }
};



// Update a movie (Admin only)
exports.updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, director, genre, rating, description } = req.body;
    const poster = req.file ? req.file.filename : null;

    try {
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found!" });
        }

        // Hapus poster lama jika ada dan ada poster baru yang diupload
        if (poster && movie.poster) {
            const fs = require('fs');
            const oldPosterPath = `public/posters/${movie.poster}`;
            // Periksa apakah file lama ada sebelum dihapus
            if (fs.existsSync(oldPosterPath)) {
                fs.unlinkSync(oldPosterPath); // Hapus file poster lama
            }
        }

        // Update movie attributes
        movie.title = title || movie.title;
        movie.director = director || movie.director;
        movie.genre = genre || movie.genre;
        movie.rating = rating || movie.rating;
        movie.description = description || movie.description;
        if (poster) {
            movie.poster = poster; // Update dengan poster baru
        }

        // Simpan perubahan ke database
        await movie.save();

        res.status(200).json({ message: "Movie updated successfully!", movie });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating movie", error });
    }
};

// Delete a movie (Admin only)
exports.deleteMovie = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findByPk(id, {
            include: [
                {
                    model: Review, // Pastikan ada relasi dengan Review
                    as: 'reviews' // Pastikan nama alias relasi sesuai
                }
            ]
        });
        if (!movie) {
            return res.status(404).json({ message: "Movie not found!" });
        }

        if (movie.poster) {
            // Hapus poster dari sistem file
            const fs = require('fs');
            fs.unlinkSync(`public/posters/${movie.poster}`);
        }

        // Hapus semua review yang terkait dengan movie ini
        if (movie.reviews.length > 0) {
            await Review.destroy({
                where: {
                    movieId: movie.id
                }
            });
        }

        // Hapus movie
        await movie.destroy();
        res.status(200).json({ message: "Movie deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting movie", error });
    }
};



exports.createReview = async (req, res) => {
    const { movieId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id; // Mendapatkan userId dari token

    try {
        const movie = await Movie.findByPk(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found!" });
        }

        const review = await Review.create({
            movieId,
            userId,  // Menyimpan userId yang ada di token
            rating,
            comment
        });

        res.status(201).json({
            message: "Review created successfully",
            review
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating review", error });
    }
};
