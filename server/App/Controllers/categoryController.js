const catModal = require("../Models/categoryModel");
const { ObjectId } = require("mongodb");

exports.addCategory = async (req, res) => {

    let catName = req.body.catName;
    let catDesc = req.body.catDesc;
    let catStatus = req.body.catStatus;
    let catImg = req.file ? req.file.filename : '';
    let upid = req.query.id ?? ''


    if (req.file === undefined) {
        if (upid !== undefined || upid !== "") {
            try {
                let dataCat = await catModal.findOne({ _id: new ObjectId(upid) });
                catImg = dataCat.catImg
            }
            catch (e) {
                console.log(e)
            }
        }
        else {
            catImg = ''
        }
    }

    let catField = {
        catName,
        catDesc,
        catImg,
        catStatus
    }

    if (req.query.id === "") {
        let addData = await new catModal(catField)
        addData.save().then((finalRes) => {
            res.send({
                status: 1,
                finalRes,
                msg: "Data inserted successfully"
            })
        })
            .catch((error) => {
                if (error.code === 11000 && error.keyPattern && error.keyPattern.catName) {
                    res.status(400).send({
                        status: 0,
                        msg: "Category name must be unique",
                    });
                }
                else {
                    res.send({
                        status: 0,
                        error,
                        msg: "Data inserted unsuccessfully"
                    })
                }
            })
    }
    else {
        let catUpdate = await catModal.updateOne({ _id: new ObjectId(upid) }, { $set: catField })
        res.status(200).send({
            status: 1,
            catUpdate,
            msg: "Category updated successfully",
        });
    }
}

exports.viewCategory = async (req, res) => {
    let dataView = await catModal.find()
    let CatImgUrl = "http://localhost:8000/upload/cat_image/";
    try {
        res.send({
            status: 1,
            dataView,
            CatImgUrl,
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

exports.deleteCategory = async (req, res) => {
    let delid = req.params.id;
    let catDel = await catModal.deleteOne({ _id: new ObjectId(delid) });
    try {
        res.send(
            {
                status: 1,
                catDel,
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

exports.updateCategory = async (req, res) => {
    let updateId = req.params.id;
    // let updatedFields = {
    //     catName: req.body.catName,
    //     catDesc: req.body.catDesc,
    //     catStatus: req.body.catStatus,
    //     catImg: req.file.filename

    // };

    // if (req.file) {
    //     updatedFields.catImg = req.file.filename;
    // }


    try {
        let updateData = await catModal.findOne({ _id: new ObjectId(updateId) })
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