const express = require("express");
const multer = require("multer");
const path = require("path");
const { registerAdmin, approveRejectAdmin, loginAdmin, listadmin, deleteadmin } = require("../controllers/adminController"); // Adjust the path to your controller
const adminRouter = express.Router();

// Set up multer storage for business license
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/business_license'); // Define the folder path where the business license should be stored
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`); // Use the current timestamp to avoid file name conflicts
    }
});

// Create an upload instance using the storage configuration
const upload = multer({ storage: storage });

// Route to register admin (with business license upload)
adminRouter.post('/register', upload.single('businessLicense'), registerAdmin);

// Route to list all admins
adminRouter.get('/list', listadmin);

// Route to login an admin
adminRouter.post('/login', loginAdmin);

// Route to approve or reject an admin registration
adminRouter.put('/approve-reject', approveRejectAdmin);

// Route to delete an admin
adminRouter.delete('/delete/:id', deleteadmin);

module.exports = adminRouter;
