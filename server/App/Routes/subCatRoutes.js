let express=require('express');
let multer=require('multer')
let path=require('path');
const { addSubCat, viewSubCat, deleteSubCat, updateSubCat } = require('../Controllers/subCatController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/subCat_img')
    },
    filename: function (req, file, cb) {
        const filename = "subcat_img" + Date.now() + path.extname(file.originalname)
        cb(null, filename)
    }
})

let subCatRoute=express.Router();
const upload = multer({ storage: storage }).single("subCatImg");

subCatRoute.post('/add-subCat',upload,addSubCat);
subCatRoute.get('/view-subCat',viewSubCat);
subCatRoute.delete('/delete-subCat/:id',deleteSubCat)
subCatRoute.get('/update-subCat/:id?',updateSubCat)


module.exports=subCatRoute