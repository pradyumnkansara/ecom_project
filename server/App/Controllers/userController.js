const userModal = require("../Models/userModal");
const { ObjectId } = require("mongodb");

exports.addUser = async (req, res) => {
    // console.log(req.body);n

    let userAdd = await userModal(req.body)
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
    let userView = await userModal.find();
    try {
        res.send({
            status: 1,
            userView,
            msg: "user data found"
        })
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
    let delId = req.params.id
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
    let loginData = {
        uEmail: req.body.uEmail,
        uPassword: req.body.uPassword
    }
    let loginmatch = await userModal.findOne({ uEmail: loginData.uEmail, uPassword: loginData.uPassword })
    try {
        res.send(
            {
                status: 1,
                loginmatch,
            }
        )
    }
    catch {
        res.send(
            {
                status: 0,
            }
        )
    }

}