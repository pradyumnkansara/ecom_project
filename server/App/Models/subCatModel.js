const { Schema, default: mongoose } = require("mongoose");

let subCatSchema = new Schema({
    catId:[{
        type: Schema.Types.ObjectId,
        ref: 'category'
     }],  
    subCatName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    subCatDesc: {
        type: String,
        required: true
    },
    subCatImg: {
        type: String,
        required: true
    },
    subCatStatus: {
        type: Boolean,
        required: true
    },
})

let subCatModal=mongoose.model("subCategory",subCatSchema);

module.exports=subCatModal;