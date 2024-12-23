const { ObjectId } = require("mongodb");
const newlyModal = require("../Models/newlyLaunchedModel");

exports.addNewLaunched = async (req, res) => {
    let newlyName = req.body.newlyName;
    let newlyDesc = req.body.newlyDesc;
    let newlyImg = req.file ? req.file.filename : '';
    let newlySize = req.body.newlySize;
    let newlyPrice = req.body.newlyPrice;
    let newlyStatus = req.body.newlyStatus;
    let upid = req.query.id ?? '';

    if (req.file === undefined) {
        if (upid !== undefined || upid !== "") {
            try {
                let datanew = await newlyModal.findOne({ _id: new ObjectId(upid) });
                newlyImg = datanew.newlyImg
            }
            catch (e) {
                console.log(e)
            }
        }
        else {
            newlyImg = ''
        }
    }

    let newField = {
        newlyName,
        newlyDesc,
        newlyImg,
        newlySize,
        newlyPrice,
        newlyStatus
    }
    if (req.query.id === "") {
        let addNewData = await newlyModal(newField)
        addNewData.save().then((restApi) => {
            res.send({
                status: 1,
                restApi,
                msg: "data inserted successfully"
            })
        })
            .catch((e) => {
                res.send({
                    status: 1,
                    error: e,
                    msg: "data inserted unsuccessfully"
                })
            })
    }
    else {
        let newUpdate = await newlyModal.updateOne({ _id: new ObjectId(upid) }, { $set: newField })
        res.status(200).send({
            status: 1,
            newUpdate,
            msg: "newLaunched updated successfully",
        });
    }

}

exports.viewNewLaunched = async (req, res) => {
    let dataView = await newlyModal.find()
    let newImgUrl = "http://localhost:8000/upload/newly_img/";
    try {
        res.send({
            status: 1,
            dataView,
            newImgUrl,
            msg_: "data found successfully"
        })
    }
    catch {
        (error) => {
            res.send({
                status: 1,
                Error: error.message,
                msg_: "data found successfully"
            })
        }
    }
}

exports.deleteNewLaunched = async (req, res) => {
    let delid = req.params.id;
    let newDel = await newlyModal.deleteOne({ _id: new ObjectId(delid) });
    try {
        res.send(
            {
                status: 1,
                newDel,
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

exports.updateNewLaunched = async (req, res) => {
    let updateId = req.params.id;

    try {
        let updateData = await newlyModal.findOne({ _id: new ObjectId(updateId) })
        res.send({
            status: 1,
            updateData,
            msg: "Data updated successfully"
        })
    }

    catch (error) {
        res.status(500).send({
            status: 0,
            msg: "Error fetching category",
            error: error.message,
        });
    }
}