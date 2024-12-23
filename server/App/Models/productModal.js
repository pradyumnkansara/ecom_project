const { Schema, default: mongoose } = require("mongoose");

let prodSchema=new Schema({
    subCatId:[{
        type: Schema.Types.ObjectId,
        ref: 'subCategory'
     }],
     catId:[{
        type: Schema.Types.ObjectId,
        ref: 'category'
     }],
    prodName:{
        type:String,
        required:true
    },
    prodSize:{
        type:String,
        required:true
    },
    prodDesc:{
        type:String,
        requierd:true
    },
    prodImg:{
        type:String,
        requierd:true
    },
    prodStatus:{
        type:Boolean,
        requierd:true
    },
    prodPrice:{
        type:Number ,
        requierd:true
    }
})

let prodModal=mongoose.model("products",prodSchema);

module.exports=prodModal
