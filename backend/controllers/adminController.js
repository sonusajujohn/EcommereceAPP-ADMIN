const adminModel = require('../model/adminModel');
const fs = require('fs');
const path = require('path');

// Admin Registration (register API)
const registerAdmin = async (req, res) => {
    const { name, email, phoneNumber, address, pincode, govtIdType, govtId, gstNumber, password } = req.body;
    let businessLicenseFilename;

    try {
        // Check if a file is uploaded via multer for business license
        if (req.file) {
            // Use the uploaded file's filename for businessLicense
            businessLicenseFilename = req.file.filename;
        } else if (req.body.businessLicense) {
            // Use the provided businessLicense URL from the request body
            businessLicenseFilename = req.body.businessLicense;
        } else {
            // Fallback to a default file name if neither is provided
            businessLicenseFilename = "default_business_license.pdf";
        }

        // Validate required fields
        if (!name || !email || !phoneNumber || !address || !pincode || !govtIdType || !govtId || !businessLicenseFilename || !gstNumber || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Validate GST Number format
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/;
        if (!gstRegex.test(gstNumber)) {
            return res.status(400).json({ success: false, message: "Invalid GST number format." });
        }

        // Validate phone number format (Indian format)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({ success: false, message: "Invalid phone number format." });
        }

        // Check if admin already exists
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: "Admin already exists." });
        }

        // Create new admin
        const newAdmin = new adminModel({
            name,
            email,
            phoneNumber,
            address,
            pincode,
            govtIdType,
            govtId,
            businessLicense: businessLicenseFilename, // Save the file name
            gstNumber,
            password,  // Store password as plain text
            status: 'pending', // Initial status as 'pending'
        });

        // Save new admin to database
        await newAdmin.save();
        res.status(201).json({ success: true, message: "Admin registration successful. Awaiting Superadmin approval." });

    } catch (error) {
        console.error("Error during admin registration:", error);
        res.status(500).json({ success: false, message: "Error occurred during registration." });
    }
};

// Admin Login (login API)
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    try {
        // Find admin by email
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found." });
        }

        // Check if admin is approved
        if (admin.status !== "approved") {
            return res.status(401).json({ success: false, message: "Admin is not approved yet." });
        }

        // Check if entered password matches the stored password
        if (password === admin.password) {
            res.json({ success: true, message: "Login successful." });
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).json({ success: false, message: "Error occurred during login." });
    }
};

// Superadmin approves or rejects admin registration (approveReject API)
const approveRejectAdmin = async (req, res) => {
    const { adminId, action } = req.body;

    if (!adminId || !action) {
        return res.status(400).json({ success: false, message: "Admin ID and action are required." });
    }

    // Validate action
    if (!['approve', 'reject'].includes(action)) {
        return res.status(400).json({ success: false, message: "Invalid action. Use 'approve' or 'reject'." });
    }

    try {
        // Find admin by ID
        const admin = await adminModel.findById(adminId);
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found." });
        }

        // Handle approval or rejection
        if (action === "approve") {
            admin.status = "approved";
            await admin.save();
            res.json({ success: true, message: "Admin approved successfully." });
        } else if (action === "reject") {
            await adminModel.findByIdAndDelete(adminId);
            res.json({ success: true, message: "Admin registration rejected and removed." });
        }

    } catch (error) {
        console.error("Error during admin approval/rejection:", error);
        res.status(500).json({ success: false, message: "Error occurred while processing the request." });
    }
};

// List Admin Items (listadmin API)
const listadmin = async (req, res) => {
    try {
        // Fetch all admins
        const admins = await adminModel.find({});
        res.status(200).json({ success: true, data: admins });
    } catch (error) {
        console.error("Error fetching admins:", error);
        res.status(500).json({ success: false, message: "Error fetching admins." });
    }
};

// Delete Admin Item (deleteadmin API)
const deleteadmin = async (req, res) => {
    const id = req.params.id;

    try {
        // Find admin by ID
        const admin = await adminModel.findById(id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found." });
        }

        // Delete associated business license file if it exists
        if (admin.businessLicense) {
            const businessLicensePath = path.join(__dirname, '../uploads/business_licenses', admin.businessLicense);
            console.log("Attempting to delete business license at:", businessLicensePath); // Log the file path for debugging

            // Check if the file exists before attempting deletion
            fs.exists(businessLicensePath, (exists) => {
                if (exists) {
                    fs.unlink(businessLicensePath, (err) => {
                        if (err) {
                            console.error("Error deleting business license:", err.message);
                            return res.status(500).json({ success: false, message: "Failed to delete business license" });
                        }
                        console.log("Business license deleted successfully");
                    });
                } else {
                    console.warn("Business license file not found:", businessLicensePath);
                }
            });
        }

        // Delete the admin from the database
        await adminModel.findByIdAndDelete(id);

        // Success response
        res.status(200).json({ success: true, message: "Admin removed." });

    } catch (error) {
        console.error("Error deleting admin:", error.message);
        res.status(500).json({ success: false, message: "Error deleting admin." });
    }
};

module.exports = { registerAdmin, approveRejectAdmin, loginAdmin, listadmin, deleteadmin };
