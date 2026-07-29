const mongoose = require("mongoose");
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    unit:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    }
});

module.exports=mongoose.model("Product",productSchema);