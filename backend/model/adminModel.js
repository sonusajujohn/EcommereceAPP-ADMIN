const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // For password hashing

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(v);
        },
        message: "Invalid email format.",
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number format
          return phoneRegex.test(v);
        },
        message: "Invalid phone number format.",
      },
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          const pincodeRegex = /^\d{6}$/; // Indian pincode format
          return pincodeRegex.test(v);
        },
        message: "Invalid pincode format.",
      },
    },
    govtIdType: {
      type: String,
      required: true,
      enum: ["pan", "aadhaar", "drivingLicense"], // Accepted values
    },
    govtId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    businessLicense: {
      type: String, // Store file path or URL
      required: true,
    },
    gstNumber: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          console.log("Validating GST Number:", value); // Log the GST number
          const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/;
          return gstRegex.test(value);
        },
        message: 'Invalid GST number format.',
      },
    },    
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending", // Default status is pending
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the admin model
const adminData = mongoose.model("admin", adminSchema);

module.exports = adminData;
