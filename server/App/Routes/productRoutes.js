const express = require('express');
const multer = require('multer');
const path = require('path');
const { addProduct, viewProduct, deleteProduct, updateProduct } = require('../Controllers/productController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/prod_img')
    },
    filename: function (req, file, cb) {
        const filename = "prod_img" + Date.now() + path.extname(file.originalname)
        cb(null, filename)
    }
})

let prodRoutes = express.Router();

let upload = multer({ storage: storage }).single('prodImg');

prodRoutes.post('/add-product', upload, addProduct);
prodRoutes.get('/view-product',viewProduct);
prodRoutes.delete('/delete-product/:id',deleteProduct);
prodRoutes.get('/update-product/:id?',updateProduct);

module.exports = prodRoutes;