const { Schema, default: mongoose } = require("mongoose");

const catSchema = new Schema({
    catName: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30,
    },
    catDesc: {
        type: String,
        required: true,
    },
    catImg: {
        type: String,
        required: true,
    },
    catStatus: {
        type: String,
        required: true,
    }
})

let catModal = mongoose.model("category", catSchema)

module.exports = catModal;