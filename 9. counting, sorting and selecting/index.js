const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Product Schema
const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    createdAt: { type: Date, default: Date.now }
});

// Product Model
const Product = mongoose.model('Product', productSchema);

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to Product API');
});

// 1️⃣ **Create a Product**
app.post('/products', async (req, res) => {
    try {
        const { title, price, description } = req.body;
        const product = new Product({ title, price, description });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2️⃣ **Get All Products**
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3️⃣ **Count Products**
app.get('/products/count', async (req, res) => {
    try {
        const count = await Product.countDocuments();
        res.status(200).json({ totalProducts: count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4️⃣ **Sort Products (Ascending / Descending by Price)**
app.get('/products/sort', async (req, res) => {
    try {
        const order = req.query.order === 'desc' ? -1 : 1;
        const products = await Product.find().sort({ price: order });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5️⃣ **Select Specific Fields (Only Title & Price)**
app.get('/products/select', async (req, res) => {
    try {
        const products = await Product.find().select('title price -_id');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 6️⃣ **Advanced API (Count, Sort, and Select Fields Together)**
app.get('/products/advanced', async (req, res) => {
    try {
        const order = req.query.order === 'desc' ? -1 : 1;
        const count = await Product.countDocuments();
        const products = await Product.find().sort({ price: order }).select('title price -_id');
        
        res.status(200).json({ total: count, products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
