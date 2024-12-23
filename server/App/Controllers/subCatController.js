const subCatModal = require("../Models/subCatModel");
const { ObjectId } = require("mongodb");


exports.addSubCat = async (req, res) => {
    // console.log(req.body)
    // console.log(req.file)
    let catId = req.body.catId;
    let subCatName = req.body.subCatName;
    let subCatDesc = req.body.subCatDesc;
    let subCatImg = req.file ? req.file.filename : "";
    let subCatStatus = req.body.subCatStatus;
    let upid = req.query.id ?? '';

    if (req.file === undefined) {
        if (upid !== undefined || upid !== "") {
            try {
                let dataSubCat = await subCatModal.findOne({ _id: new ObjectId(upid) });
                subCatImg = dataSubCat.subCatImg
            }
            catch (e) {
                console.log(e)
            }
        }
        else {
            subCatImg = ''
        }
    }

    let subCatFields = {
        catId,
        subCatName,
        subCatDesc,
        subCatImg,
        subCatStatus
    }

    if (req.query.id === "") {
        let addSub = await subCatModal(subCatFields)
        addSub.save().then((restApi) => {
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
        let subCatUpdate = await subCatModal.updateOne({ _id: new ObjectId(upid) }, { $set: subCatFields })
        res.status(200).send({
            status: 1,
            subCatUpdate,
            msg: "Sub-Category updated successfully",   
        });
    }
}

exports.viewSubCat = async (req, res) => {
    let viewSub = await subCatModal.find().populate('catId').exec();
    let subCatImgUrl = "http://localhost:8000/upload/subCat_img/";
    try {
        res.send({
            status: 1,
            viewSub,
            subCatImgUrl,
            msg: "Data found"
        })
    }
    catch (e) {
        res.send({
            status: 0,
            error: e,
            msg: "Data not found"
        })
    }
}

exports.deleteSubCat = async (req, res) => {
    let delid = req.params.id;
    let subCatDel = await subCatModal.deleteOne({ _id: new ObjectId(delid) });
    try {
        res.send(
            {
                status: 1,
                subCatDel,
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

exports.updateSubCat = async (req, res) => {
    let updateId = req.params.id;

    try {
        let updateData = await subCatModal.findOne({ _id: new ObjectId(updateId) })
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