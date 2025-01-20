// authRoleMiddleware.js
const isAdminMiddleware = (req, res, next) => {
    const user = req.user; // Asumsikan sudah ada user yang diset di request dari authMiddleware

    if (!user || user.role !== 'Admin') {
        return res.status(403).json({ message: "Akses ditolak! Hanya Admin yang bisa mengakses." });
    }
    
    next(); // Jika role adalah Admin, lanjutkan ke controller berikutnya
};

module.exports = isAdminMiddleware;
