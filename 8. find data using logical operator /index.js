const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Create a Product Schema
const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a Product Model
const Product = mongoose.model('Product', productSchema);

// Server Listening
app.listen(port, () => console.log(`Server is running on port ${port}`));

// Home Route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Create a Product (POST)
app.post('/products', async (req, res) => {
    try {
        const { title, price, description } = req.body;
        const product = new Product({ title, price, description });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Products (GET)
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Logical Operator Queries

// 1. $and - Fetch products with price > 100 AND title contains "phone"
app.get('/products/and', async (req, res) => {
    try {
        const products = await Product.find({
            $and: [
                { price: { $gt: 100 } },
                { title: /phone/i } // Case-insensitive search
            ]
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. $or - Fetch products where price > 500 OR title contains "laptop"
app.get('/products/or', async (req, res) => {
    try {
        const products = await Product.find({
            $or: [
                { price: { $gt: 500 } },
                { title: /laptop/i }
            ]
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. $not - Fetch products where price is NOT greater than 500
app.get('/products/not', async (req, res) => {
    try {
        const products = await Product.find({
            price: { $not: { $gt: 500 } }
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. $nor - Fetch products where price is NOT > 500 AND title does NOT contain "tablet"
app.get('/products/nor', async (req, res) => {
    try {
        const products = await Product.find({
            $nor: [
                { price: { $gt: 500 } },
                { title: /tablet/i }
            ]
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Product by ID (PUT)
app.put('/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Product by ID (DELETE)
app.delete('/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
