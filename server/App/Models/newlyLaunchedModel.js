const { Schema, default: mongoose } = require("mongoose");

let newlySchema=new Schema({
    newlyName:{
        type:String,
        required:true
    },
    newlySize:{
        type:String,
        required:true
    },
    newlyDesc:{
        type:String,
        requierd:true
    },
    newlyImg:{
        type:String,
        requierd:true
    },
    newlyStatus:{
        type:Boolean,
        requierd:true
    },
    newlyPrice:{
        type:Number,
        requierd:true
    }
})

let newlyModal=mongoose.model("newLaunched",newlySchema);

module.exports=newlyModal