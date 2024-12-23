const express = require("express");
const catroute = require("./Routes/categoryRoutes");
const banRoute = require("./Routes/bannerRoutes");
const subCatRoute = require("./Routes/subCatRoutes");
const prodRoutes = require("./Routes/productRoutes");
const contactRoute = require("./Routes/contactRoute");
const userRoute = require("./Routes/userRoutes");
const newlyRoutes = require("./Routes/newlyLaunchedRoute");
const bestRoutes = require("./Routes/bestSellerRoutes");
let route = express.Router();

route.use('/category',catroute)
route.use('/banner',banRoute)
route.use('/sub-cat',subCatRoute)
route.use('/product',prodRoutes)
route.use('/contact',contactRoute)
route.use('/user',userRoute)
route.use('/new_launched',newlyRoutes)
route.use('/best_seller',bestRoutes)

module.exports=route