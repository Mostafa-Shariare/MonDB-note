const express = require('express');
const mongoose = require('mongoose');
const { type } = require('os');
const { title } = require('process');
const app = express();
const port = 3002;

//create a product schema
const productsSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,    
    createdAt: {
        type: Date,
        default: Date.now
    }                        
})

//crate a product model
const Product = mongoose.model('Products', productsSchema);

mongoose.connect('mongodb://localhost:27017/test')
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));             

app.listen(port, () => console.log('Server is running on port 3002'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
  
