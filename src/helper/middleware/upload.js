const multer = require('multer');
const path = require('path');
const { failed } = require('../response')

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage: multerStorage,
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const ext = (/\.(gif|jpe?g|png)$/i).test(`${Date.now()}${path.extname(file.originalname)}`);
        if (ext) {
            cb(null, true)
        } else {
            cb({ message: 'Wrong image extension' }, false)
        }
    }
});

const singleUpload = (req, res, next) => {
    const single = upload.single('image');
    single(req, res, (err) => {
        if (err) {
            failed(res, err.message)
        } else {
            next();
        }
    })
}

module.exports = singleUpload