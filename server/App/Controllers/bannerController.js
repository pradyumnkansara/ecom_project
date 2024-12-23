const banModal = require("../Models/bannerModel");
const { ObjectId } = require("mongodb");

exports.addBanner = async (req, res) => {
    let banName = req.body.banName;
    let banStatus = req.body.banStatus;
    let banImg = req.file ? req.file.filename : '';
    let upid = req.query.id ?? '';

    if (req.file === undefined) {
        if (upid !== undefined || upid !== "") {
            try {
                let bandata = await banModal.findOne({ _id: new ObjectId(upid) });
                banImg = bandata.banImg
            }
            catch (e) {
                console.log(e)
            }
        }
        else {
            banImg = ''
        }
    }

    let banField = {
        banName,
        banStatus,
        banImg
    }

    if (req.query.id === "") {
        // Insert Banner
        let insertBan = await new banModal(banField).save();
        try {
            res.send({
                status: 1,
                insertBan,
                msg: "banner inserted successfully"
            })
        }
        catch (e) {
            res.send({
                status: 0,
                error: e,
                msg: "banner not inserted"
            })
        }
    }

    else {
        // Update Banner
        let banupdate = await banModal.updateOne({ _id: new ObjectId(upid) }, { $set: banField })
        res.send({
            status: 1,
            banupdate,
            msg: "data Updated successfully"
        })
    }

}

exports.veiwBanner = async (req, res) => {
    let bannerData = await banModal.find();
    let banImgUrl = "http://localhost:8000/upload/ban_img/";
    try {
        res.send({
            staus: 1,
            bannerData,
            banImgUrl,
            msg: "Data Found"
        })
    }
    catch (e) {
        res.send({
            staus: 0,
            error: e,
            msg: "Data Found"
        })
    }
}

exports.deleteBanner = async (req, res) => {
    let delid = req.params.id;
    // console.log(req.query);
    let bandelete = await banModal.deleteOne({ _id: new ObjectId(delid) })
    try {
        res.send({
            status: 1,
            bandelete,
            msg: "Data deleted successfully"
        })
    }
    catch (e) {
        res.send({
            status: 0,
            error: e,
            msg: "Data not deleted"
        })
    }
}

exports.updateBanner = async (req, res) => {
    let banId = req.params.id;

    try {
        let updateData = await banModal.findOne({ _id: new ObjectId(banId) })
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