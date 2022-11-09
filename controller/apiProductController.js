const product=require('../model/product')
const path=require('path')

//create api
const create=async(req,res)=>{
    if(!req.body.name && req.body.price && req.body.size && req.body.details && req.body.image){
        res.status(400).send({massage:"please fill all the input field"})
    }
    const createProduct=new product({
        name:req.body.name,
        price:req.body.price,
        size:req.body.size,
        details:req.body.details,
        image:image.path,
    })
    await createProduct.save().then((data)=>{
        res.status(200).send({success:true, msg:"Product create successfully", productData:data})
        console.log(data,'hjcasgfgfajsfjsafg');
    })
}

module.exports={
    create,
}
