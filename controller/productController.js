const product = require("../model/product");
const path = require("path");

//All Product showing
exports.productView = (req, res, next) => {
  product.find((err, data) => {
    if (!err) {
      res.render("product_views", {
        title: "Product Page",
        ProductData: data,
      });
    }
  });
};

//Product add
exports.addproduct = (req, res, next) => {
  res.render("add_product", {
    title: "add product",
  });
};

// create data
exports.create = (req, res) => {
  const image = req.file;
  const Product = new product({
    name: req.body.name,
    price: req.body.price,
    size: req.body.size,
    details: req.body.details,
    image: image.path
  });
  Product.save()
    .then((result) => {
      console.log(result, "Product save successfuly");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err, "product not save");
      res.redirect("/addproduct");
    });
};

//show edit page
exports.edit = (req, res, next) => {
  const pid = req.params.id;
  product
    .findById(pid)
    .then((products) => {
      console.log(products);
      res.render("edit_product", {
        title: "edit-product",
        ProductData: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.update = async (req, res) => {
  var update_det = {
    name: req.body.name,
    price: req.body.price,
    size: req.body.size,
    details: req.body.details,
    image: req.file.path,
  };

//   console.log("fjkdshfsfkgasjhfgajgdfgsfjfg", req.file);
  await product
    .findByIdAndUpdate({ _id: req.params.id }, update_det)
    .then((update) => {
      console.log("hgsdjadsjahdka", update);
    });
  res.redirect("/");
};

//update product
// exports.update = (req, res, next) => {
//   console.log("hcxjhczkfdsgfsihughfgfgdg", req.params);
//   const image = req.file;
//   //console.log(image);
//   const product_id = req.params.id;
//   const name = req.body.name;
//   const price = req.body.price;
//   const size = req.body.size;
//   const details = req.body.details;

//   //console.log(product_id,product_name,price,size,details,image)
//   product
//     .findById(product_id)
//     .then((result) => {
//       result.name = name;
//       result.price = price;
//       result.size = size;
//       result.details = details;
//       result.image = image.path;
//       return result.save().then((results) => {
//         res.redirect("/");
//         console.log(result, "update successfully");
//       });
//     })
//     .catch((err) => {
//       console.log(err, "update product failed-");
//     });
// };

// Hard delete
// exports.delete = async (req, res) => {
//   product
//     .findByIdAndDelete({ _id: req.params.id })
//     .then((data) => {
//       res.redirect("/");
//       console.log(data, "delete product");
//     })
//     .catch((err) => {
//       console.log(err, "delete failed");
//     });
// };

exports.delete=(req,res)=>{
    product.findByIdAndUpdate(req.params.id,{status:0},(err,data)=>{
        if(!err){
            res.redirect('/')
        }else{
            console.log(err);
            res.redirect('/')
        }
    })
}