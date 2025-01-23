const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username dan password wajib diisi!" });
    }

    try {
        const newUser = await User.create({ username, password });
        res.status(201).json({ message: "Registrasi berhasil!", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error saat registrasi", error });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username dan password wajib diisi!" });
    }

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.log("User not found")
            return res.status(404).json({ message: "User tidak ditemukan!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Input Password:", password); // Password input dari user
        console.log("Stored Hash:", user.password); // Hash yang disimpan di database
        console.log("Match Result:", isMatch); // Apakah cocok?
        
        if (!isMatch) {
            console.log("Pass input:", password)
            console.log("Pass Hash:", user.password)
            return res.status(401).json({ message: "Password salah!" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role }, // Menambahkan role ke dalam payload
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({ message: "Login berhasil!", token });
    } catch (error) {
        res.status(500).json({ message: "Error saat login", error });
    }
};

exports.logout = async (req, res) => {
    try {
        // Untuk logout, kita cukup menghapus token dari sisi klien
        res.status(200).json({ message: "Logout berhasil!" });
    } catch (error) {
        res.status(500).json({ message: "Error saat logout", error });
    }
};


