let path = require('path');
let multer = require('multer');
const { v1: uuidv1 } = require('uuid');

let memoryStorage = multer.memoryStorage();
module.exports = {
    memoryFile: multer({ storage: memoryStorage }),
    uploadFile: (folder_path) => {
        let storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, folder_path);
            },
            filename: function (req, file, cb) {
                cb(null, uuidv1() + path.extname(file.originalname));
            }
        });
        return multer({ storage: storage });
    },
    deleteFile: (path) => {
        if (path != null && path != undefined && path.length > 0) {
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
        }
    }
};
