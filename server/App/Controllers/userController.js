const userModal = require("../Models/userModal");
const { ObjectId } = require("mongodb");
const { hashPassword, compareHashPassword, generateToken } = require("../utils/helpers");
const { jwtCreds } = require("../../config");

exports.addUser = async (req, res) => {
    // console.log(req.body);
    hashPassword(req.body.uPassword)
    let userAdd = await userModal(req.body)
    const password = await hashPassword(req.body.uPassword);
    userAdd.uPassword=password;
    userAdd.save().then((restApi) => {
        console.log(restApi)
        res.send({
            status: 1,
            restApi,
            msg: "user added successfully"
        }) 
    })
}

exports.viewUser = async (req, res) => {
    
   
    try {
        const { id } = req.params; // Get the ID from the request parameters
        let userView;

        if (id) {
            // Find a single user by ID
            userView = await userModal.findById(id);
            if (!userView) {
                return res.status(404).send({
                    status: 0,
                    msg: "User not found",
                });
            }
        } else {
            // Find all users if no ID is provided
            userView = await userModal.find();
        }

        res.send({
            status: 1,
            userView,
            msg: id ? "User data found" : "All users data found",
        });
    }
    catch (e) {
        res.send({
            status: 0,
            error: e,
            msg: "user data not found"
        })
    }
}

exports.deleteUser = async (req, res) => {
    let delId = req.params.id;
    let delUser = await userModal.deleteOne({ _id: new ObjectId(delId) });

    try {
        res.send(
            {
                status: 1,
                delUser,
                msg_: "data deleted successfully"
            }
        )
    }
    catch {
        res.send(
            {
                status: 0,
                msg_: "data not deleted"
            }
        )
    }
}

exports.login = async (req, res) => {
    try {
        // Validate input
        const { uEmail, uPassword } = req.body;
        if (!uEmail || !uPassword) {
            return res.status(400).send({
                status: 0,
                message: 'Email and password are required.',
            });
        }

        // Find user
        const user = await userModal.findOne({ uEmail });
        if (!user) {
            res.status(400).send({
                status: 0,
                message: 'Invalid email',
            });
        }
        const loginmatch =await compareHashPassword(uPassword,user.uPassword);
        
        if (!loginmatch) {
            return res.status(401).send({
                status: 0,
                message: 'Invalid password.',
            });
        }

        const jwt = generateToken( {
            uEmail: user.uEmail,
          });
          if (!jwt) {
            res.status(500).send({
              statusCode: 500,
              status: false,
              error: true,
              message: "Error while generating Token: Please login again",
            });
          }

        // Successful login
        res.status(200).send({
            status: 1,
            message: 'Login successful.',
            user: {
                id: user._id,
                email: user.uEmail,
                auth: jwt, 
                // Avoid sending sensitive data like password
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send({
            status: 0,
            message: 'An error occurred while processing your request.',
        });
    }
};