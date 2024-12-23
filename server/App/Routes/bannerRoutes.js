let express = require('express');
let multer = require('multer');
let path =require('path')
const { addBanner, veiwBanner, deleteBanner, updateBanner } = require('../Controllers/bannerController');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'upload/ban_img')
    },
    filename: function (req, file, cb) {
        const filename = "ban_img" + Date.now() + path.extname(file.originalname)
        cb(null, filename)
    }
})

let banRoute = express.Router()

let upload =multer({storage:storage}).single('banImg')

banRoute.post('/add-banner',upload,addBanner);
banRoute.get('/view-banner',veiwBanner);
banRoute.delete('/delete-banner/:id',deleteBanner);
banRoute.get('/update-banner/:id',updateBanner)

module.exports = banRoute;