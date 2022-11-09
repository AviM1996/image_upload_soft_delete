const express=require('express')
const Router=express.Router ();

const productController=require("../controller/productController")

Router.get("/",productController.productView)
Router.get("/addproduct",productController.addproduct)
Router.post("/create",productController.create)
Router.get('/edit/:id',productController.edit)
Router.post('/update/:id',productController.update)
Router.get('/delete/:id',productController.delete)


module.exports=Router