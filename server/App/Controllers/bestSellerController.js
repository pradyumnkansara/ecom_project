const { ObjectId } = require("mongodb");
const bestModal = require("../Models/bestSellerModal");

exports.addBestSeller = async (req, res) => {
    let bestName = req.body.bestName;
    let bestDesc = req.body.bestDesc;
    let bestImg = req.file ? req.file.filename : '';
    let bestSize = req.body.bestSize;
    let bestPrice = req.body.bestPrice;
    let bestStatus = req.body.bestStatus;
    let upid = req.query.id ?? '';

    if (req.file === undefined) {
        if (upid !== undefined || upid !== "") {
            try {
                let databest = await bestModal.findOne({ _id: new ObjectId(upid) });
                bestImg = databest.bestImg
            }
            catch (e) {
                console.log(e)
            }
        }
        else {
            bestImg = ''
        }
    }

    let bestField = {
        bestName,
        bestDesc,
        bestImg,
        bestSize,
        bestPrice,
        bestStatus
    }
    if (req.query.id === "") {
        let addBestData = await bestModal(bestField)
        addBestData.save().then((restApi) => {
            res.send({
                status: 1,
                restApi,
                msg: "data inserted successfully"
            })
        })
            .catch((e) => {
                res.send({
                    status: 0,
                    error: e,
                    msg: "data inserted unsuccessfully"
                })
            })
    }
    else {
        let bestUpdate = await bestModal.updateOne({ _id: new ObjectId(upid) }, { $set: bestField })
        res.status(200).send({
            status: 1,
            bestUpdate,
            msg: "newLaunched updated successfully",
        });
    }

}

exports.viewBestSeller = async (req, res) => {
    let dataView = await bestModal.find()
    let bestImgUrl = "http://localhost:8000/upload/best_img/";
    try {
        res.send({
            status: 1,
            dataView,
            bestImgUrl,
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

exports.deleteBestSeller = async (req, res) => {
    let delid = req.params.id;
    let newDel = await bestModal.deleteOne({ _id: new ObjectId(delid) });
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

exports.updateBestSeller = async (req, res) => {
    let updateId = req.params.id;

    try {
        let updateData = await bestModal.findOne({ _id: new ObjectId(updateId) })
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