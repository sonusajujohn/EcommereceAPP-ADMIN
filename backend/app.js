const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());


require('./config/db');

const productRoutes = require('./route/productroutes');
app.use('/api/product', productRoutes);

app.use('/uploads', express.static('uploads'));

// const categroyRoutes= require('./route/categoryRoutes');
// app.use('/api/category',categroyRoutes)

const adminRoutes = require('./route/adminRoutes');
app.use('/admin',adminRoutes);




const port = process.env.PORT || 5000; // Fallback to port 5000 if not set in .env
app.listen(port, () => {
    console.log(`The app is listening at port : ${port}`);
});
