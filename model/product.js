const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    size:{
        type:String,
        required:true,
    },
    details:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        require:false
    },
    status: {
        type: Number
      }

       
}) 

const product=new mongoose.model("product",productSchema)
module.exports=product