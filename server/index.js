const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const route = require("./App/router");
let app = express();
app.use(cors());
app.use(express.json());

app.use("/upload/cat_image",express.static("upload/cat_image"));
app.use("/upload/ban_img",express.static("upload/ban_img"))
app.use("/upload/subCat_img",express.static("upload/subCat_img"))
app.use("/upload/prod_img",express.static("upload/prod_img"))
app.use("/upload/newly_img",express.static("upload/newly_img"))
app.use("/upload/best_img",express.static("upload/best_img"))
app.use(route)

mongoose.connect('mongodb://127.0.0.1:27017/pdArts')
    .then(() => {
        app.listen("8000")
        console.log('Connected!')
    });
