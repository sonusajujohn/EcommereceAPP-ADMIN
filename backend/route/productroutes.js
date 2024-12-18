const express = require("express");
const multer = require("multer");
const path = require("path");
const { listProduct, addProduct, updateProduct, deleteProduct } = require("../controllers/productController"); // Adjust the path to your controller
const productRouter = express.Router();

const storage=multer.diskStorage({
  destination:"uploads",
  filename:(req,file,cb)=>{
      return cb(null,`${Date.now()}${file.originalname}`)
  }
});

const upload=multer({storage:storage})

productRouter.post('/addproduct',upload.single('image'),addProduct);

// Route to list all products
productRouter.get("/listproducts", listProduct);


// Route to update an existing product by ID with optional image upload
productRouter.put("/updateproduct/:id",updateProduct);

// Route to delete a product by ID
productRouter.delete("/deleteproduct/:id",deleteProduct);

module.exports = productRouter;
