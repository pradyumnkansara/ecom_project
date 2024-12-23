const { Schema, default: mongoose } = require("mongoose");

let bestSchema=new Schema({
    bestName:{
        type:String,
        required:true
    },
    bestSize:{
        type:String,
        required:true
    },
    bestDesc:{
        type:String,
        requierd:true
    },
    bestImg:{
        type:String,
        requierd:true
    },
    bestStatus:{
        type:Boolean,
        requierd:true
    },
    bestPrice:{
        type:Number,
        requierd:true
    }
})

let bestModal=mongoose.model("bestSeller",bestSchema);

module.exports=bestModal