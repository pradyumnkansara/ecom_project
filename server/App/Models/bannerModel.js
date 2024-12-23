const { Schema, default: mongoose } = require("mongoose");

const schema = new Schema({
    banName:{
        type:String,
        require:true,
        minlength:1,
        maxlength:30
    },
    banImg:{
        type:String,
        require:true
    },
    banStatus:{
        type:Boolean,
        require:true
    }
})

let banModal=mongoose.model("banner",schema)

module.exports=banModal