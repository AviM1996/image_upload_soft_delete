const express = require('express')
const Router=express.Router();

const apiHomeController=require('../controller/apiProductController')


//data create trough api
Router.post('/create',apiHomeController.create)


module.exports=Router