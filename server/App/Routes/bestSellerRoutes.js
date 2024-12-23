const express = require('express');
const multer = require('multer');
const path = require('path');
const { addBestSeller, viewBestSeller, deleteBestSeller, updateBestSeller } = require('../Controllers/bestSellerController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/best_img')
    },
    filename: function (req, file, cb) {
        const filename = "best_img" + Date.now() + path.extname(file.originalname)
        cb(null, filename)
    }
})

let bestRoutes = express.Router();

let upload = multer({ storage: storage }).single('bestImg');

bestRoutes.post('/add-best_seller', upload,addBestSeller)
bestRoutes.get('/view-best_seller',viewBestSeller)
bestRoutes.delete('/delete-best_seller/:id?',deleteBestSeller)
bestRoutes.get('/update-best_seller/:id?',updateBestSeller)

module.exports=bestRoutes
