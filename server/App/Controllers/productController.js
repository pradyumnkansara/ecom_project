const prodModal = require("../Models/productModal");
const { ObjectId } = require("mongodb");

exports.addProduct = async (req, res) => {
    let prodName = req.body.prodName;
    let prodDesc = req.body.prodDesc;
    let prodImg = req.file ? req.file.filename : '';
    let prodSize = req.body.prodSize;
    let prodPrice = req.body.prodPrice;
    let prodStatus = req.body.prodStatus;
    let subCatId = req.body.subCatId;
    let catId = req.body.catId;
    let upid = req.query.id ?? '';

    if (req.file === undefined) {
        if (upid !== undefined || upid !== "") {
            try {
                let dataProd = await prodModal.findOne({ _id: new ObjectId(upid) });
                prodImg = dataProd.prodImg
            }
            catch (e) {
                console.log(e)
            }
        }
        else {
            prodImg = ''
        }
    }

    let prodField = {
        subCatId,
        catId,
        prodName,
        prodDesc,
        prodImg,
        prodSize,
        prodPrice,
        prodStatus
    }
    if (req.query.id === "") {
        let addProdData = await prodModal(prodField)
        addProdData.save().then((restApi) => {
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
        let prodUpdate = await prodModal.updateOne({ _id: new ObjectId(upid) }, { $set: prodField })
        res.status(200).send({
            status: 1,
            prodUpdate,
            msg: "product updated successfully",
        });
    }

}

exports.viewProduct = async (req, res) => {
    let viewprodData = await prodModal.find().populate({
        path: 'subCatId', // Populate subCatId
        // select:'catId'
        populate: {
            path: 'catId', // Populate catId within subCatId
        },
    }).exec();
    let prodImgUrl = "http://localhost:8000/upload/prod_img/"
    try {
        res.send({
            status: 1,
            viewprodData,
            prodImgUrl,
            msg: "data founded"
        })
    }
    catch {
        res.send({
            status: 0,
            viewprodData,
            msg: "data not found"
        })
    }
}

exports.deleteProduct = async (req, res) => {
    let delid = req.params.id;
    let prodDel = await prodModal.deleteOne({ _id: new ObjectId(delid) });
    try {
        res.send(
            {
                status: 1,
                prodDel,
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

exports.updateProduct = async (req, res) => {
    let updateId = req.params.id;

    try {
        let updateData = await prodModal.findOne({ _id: new ObjectId(updateId) })
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