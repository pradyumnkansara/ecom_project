let express=require('express');
const { addUser, viewUser, deleteUser, login } = require('../Controllers/userController');

let userRoute=express.Router();

userRoute.post("/add-user",addUser);
userRoute.get("/view-user/:id?",viewUser);
userRoute.delete("/delete-user/:id",deleteUser);
userRoute.post('/login-user',login)

module.exports=userRoute