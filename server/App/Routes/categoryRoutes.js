const express = require("express");
const multer = require("multer");
const path = require("path")

const { addCategory, viewCategory, deleteCategory, updateCategory } = require("../Controllers/categoryController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/cat_image')
    },
    filename: function (req, file, cb) {
        const filename = "cat_img" + Date.now() + path.extname(file.originalname)
        cb(null, filename)
    }
})

let catroute = express.Router();

const upload = multer({ storage: storage }).single("catImg")

catroute.post('/add-category', upload, addCategory);
catroute.get('/view-category',viewCategory);
catroute.delete('/delete-category/:id',deleteCategory);
catroute.get('/update-category/:id?',updateCategory);


module.exports = catroute