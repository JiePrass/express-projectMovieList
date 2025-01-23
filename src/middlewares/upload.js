const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('File destination:', 'public/posters');  // Log folder tujuan
        cb(null, 'public/posters'); // Folder penyimpanan
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + path.extname(file.originalname);
        console.log('File name:', filename);  // Log nama file yang disimpan
        cb(null, filename); // Nama unik untuk file
    },
});

const upload = multer({ storage });
module.exports = upload;
