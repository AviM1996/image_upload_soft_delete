const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const path = require("path");
//step 1 install multer file first
const multer = require("multer");
//step 2 create a static page for upload
app.use("/upload", express.static(path.join(__dirname, "upload")));
//step 3
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
//step 4 filter means image formate

const fileFilter=(req,file,cb)=>{
  if(file.mimetype.includes("png") || file.mimetype.includes("jpeg") || file.mimetype.includes("jpg")){
    cb(null,true)
  }else{
    cb(null,false)
  }
}
//step 5 file upload
app.use(multer({storage:fileStorage,fileFilter,limits:{fieldSize:1024*1024*5}}).single('image'))


app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

const productRouter = require("./Routes/productRouter");
app.use(productRouter);

const apiHomeRouter = require("./Routes/apiRouter");
app.use(apiHomeRouter);

const dblink ="mongodb+srv://avi1996:7QzONiaFux6lhcRz@cluster0.vfnrjxd.mongodb.net/pdetailsdb";
const port = process.env.PORT || 4400;
mongoose
  .connect(dblink, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port, () => {
      console.log(`server is connected http://localhost:${port}`);
      console.log("DB is connected");
    });
  })
  .catch((err) => {
    console.log("something Went error");
  });
