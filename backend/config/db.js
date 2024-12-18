const mongoose = require("mongoose");

const mongoDB_URL = process.env.MONGODB_URL;

mongoose.connect(mongoDB_URL)
    .then(() => {
        console.log("DB CONNECTION ESTABLISHED SUCCESSFULLY");
    })
    .catch((err) => {
        console.error("MONGO-DB CONNECTION FAILED", err);
    });
