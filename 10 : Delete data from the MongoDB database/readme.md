Deleting data from a **MongoDB** database using **Express.js** is simple. We can delete data using the following **MongoDB methods** in Mongoose:

1. **`findByIdAndDelete(id)`** → Deletes a single document by its ID.
2. **`deleteOne({ condition })`** → Deletes a single document that matches a condition.
3. **`deleteMany({ condition })`** → Deletes multiple documents that match a condition.

---

## **📜 Full Code with Delete Routes**
```js
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

// 1️⃣ **Delete a Product by ID**
app.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2️⃣ **Delete One Product by Condition (Example: Delete by Title)**
app.delete('/products/deleteOne', async (req, res) => {
    try {
        const product = await Product.deleteOne({ title: req.body.title });
        if (product.deletedCount === 0) {
            return res.status(404).json({ message: 'No matching product found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3️⃣ **Delete Multiple Products (Example: Delete all products with price < 50)**
app.delete('/products/deleteMany', async (req, res) => {
    try {
        const result = await Product.deleteMany({ price: { $lt: 50 } });
        res.status(200).json({ message: `Deleted ${result.deletedCount} products` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```

---

## **📌 Explanation**
1. **Delete by ID (`findByIdAndDelete`)**
   - Endpoint: `DELETE /products/:id`
   - Finds a product by its **MongoDB ObjectId** and deletes it.
   - If the product does not exist, it returns `404 Not Found`.

2. **Delete One by Condition (`deleteOne`)**
   - Endpoint: `DELETE /products/deleteOne`
   - Deletes a single product **by title** (passed in request body).
   - If no product is found, it returns `404 Not Found`.

3. **Delete Multiple Products (`deleteMany`)**
   - Endpoint: `DELETE /products/deleteMany`
   - Deletes all products where `price < 50`.
   - Returns the number of deleted products.

---

## **🛠️ How to Test**
### **Using Postman or cURL**
1️⃣ **Delete by ID**  
```sh
DELETE http://localhost:3002/products/60a77b7d85a34e3d44f83b3b
```

2️⃣ **Delete One Product by Title**
```sh
DELETE http://localhost:3002/products/deleteOne
Content-Type: application/json

{
    "title": "Old Product"
}
```

3️⃣ **Delete Many Products (Price < 50)**
```sh
DELETE http://localhost:3002/products/deleteMany
```

---

## **🚀 Summary**
| **Method** | **Route** | **Action** |
|------------|----------|------------|
| `findByIdAndDelete(id)` | `DELETE /products/:id` | Delete a product by ID |
| `deleteOne({ condition })` | `DELETE /products/deleteOne` | Delete a single product by a condition (e.g., title) |
| `deleteMany({ condition })` | `DELETE /products/deleteMany` | Delete multiple products by a condition (e.g., price < 50) |
