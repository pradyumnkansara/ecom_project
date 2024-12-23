const express = require('express');
const multer = require('multer');
const path = require('path');
const { addNewLaunched, viewNewLaunched, deleteNewLaunched, updateNewLaunched } = require('../Controllers/newlyLaunchedController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/newly_img')
    },
    filename: function (req, file, cb) {
        const filename = "newly_img" + Date.now() + path.extname(file.originalname)
        cb(null, filename)
    }
})

let newlyRoutes = express.Router();

let upload = multer({ storage: storage }).single('newlyImg');

newlyRoutes.post('/add-new_launched', upload,addNewLaunched)
newlyRoutes.get('/view-new_launched',viewNewLaunched)
newlyRoutes.delete('/delete-new_launched/:id?',deleteNewLaunched)
newlyRoutes.get('/update-new_launched/:id?',updateNewLaunched)

module.exports=newlyRoutes