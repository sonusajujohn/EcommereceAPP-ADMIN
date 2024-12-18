const productModel = require('../model/productModel');
const fs = require('fs');
const path = require('path');

// GET OPERATION
const listProduct = async (req, res) => {
    try {
        const data = await productModel.find();
        res.status(200).json(data);  // Sending the data in JSON format
    } catch (error) {
        console.error('Error in listProduct:', error.message);
        res.status(404).send("DATA NOT FOUND");
    }
};

const addProduct = async (req, res) => {
    try {
        // Check if a file is uploaded via multer
        let image_filename;

        if (req.file) {
            // Use the uploaded file's filename
            image_filename = req.file.filename;
        } else if (req.body.image) {
            // Use the provided image URL from the request body
            image_filename = req.body.image;
        } else {
            // Fallback to a default image if neither is provided
            image_filename = "default.jpg";
        }

        // Create a new product document
        const product = new productModel({
            brand: req.body.brand,
            title: req.body.title,
            color: req.body.color,
            description: req.body.description,
            totalQuantity: req.body.totalQuantity,
            sizeQuantities: req.body.sizeQuantities,
            topCategory: req.body.topCategory,
            subCategory: req.body.subCategory,
            price: req.body.price,
            image: image_filename,
        });

        // Save the product to the database
        const savedProduct = await product.save();
        res.status(201).json({ success: true, message: "Product added successfully", data: savedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "POST OPERATION FAILED", error: error.message });
    }
};




// PUT OPERATION
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const existingProduct = await productModel.findById(id);

        if (!existingProduct) {
            return res.status(404).send("Product not found");
        }

        if (req.file) {
            // Delete the old image file if a new image is uploaded
            fs.unlinkSync(path.join(__dirname, '../uploads', existingProduct.image)); // Ensure the correct path

            req.body.image = req.file.filename; // Update with the new image filename
        }

        const data = await productModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).send("UPDATE OPERATION SUCCESSFUL");
    } catch (error) {
        console.error('Error in updateProduct:', error.message);
        res.status(500).send("UPDATE OPERATION FAILED");
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        // Fetch the product by ID
        const product = await productModel.findById(id);

        // If the product doesn't exist, return a 404
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Delete associated image if it exists
        if (product.image) {
            const imagePath = path.join(__dirname, '../uploads', product.image);
            console.log("Attempting to delete image at:", imagePath); // Log the image path for debugging

            // Check if the file exists before attempting deletion
            fs.exists(imagePath, (exists) => {
                if (exists) {
                    fs.unlink(imagePath, (err) => {
                        if (err) {
                            console.error("Error deleting image:", err.message);
                            return res.status(500).json({ success: false, message: "Failed to delete image" });
                        }
                        console.log("Image deleted successfully");
                    });
                } else {
                    console.warn("Image file not found:", imagePath);
                }
            });
        }

        // Delete the product from the database
        await productModel.findByIdAndDelete(id);

        // Success response
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error in deleteProduct:", error.message);
        res.status(500).json({ success: false, message: "DELETE OPERATION FAILED", error: error.message });
    }
};



module.exports = { listProduct, addProduct, updateProduct, deleteProduct };
