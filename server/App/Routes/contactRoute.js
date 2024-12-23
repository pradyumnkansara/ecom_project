let express=require('express')
let multer=require ('multer')
const { saveForm } = require('../Controllers/contactController')

let contactRoute=express.Router()

contactRoute.post("/contact-mail",multer().none(),saveForm)


module.exports=contactRoute