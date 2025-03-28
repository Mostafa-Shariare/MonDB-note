### **🔄 Updating Data in MongoDB Using Express.js**
Updating data in MongoDB using **Express.js** and **Mongoose** can be done using these methods:

1. **`findByIdAndUpdate(id, updatedData, options)`** → Updates a single document by its **ID**.
2. **`updateOne({ condition }, { $set: updatedData })`** → Updates **one** document that matches a condition.
3. **`updateMany({ condition }, { $set: updatedData })`** → Updates **multiple** documents that match a condition.

---

## **📜 Full Code with Update Routes**
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

// 1️⃣ **Update a Product by ID**
app.put('/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2️⃣ **Update One Product by Condition (Example: Update by Title)**
app.put('/products/updateOne', async (req, res) => {
    try {
        const updatedProduct = await Product.updateOne(
            { title: req.body.oldTitle }, 
            { $set: { title: req.body.newTitle } }
        );

        if (updatedProduct.modifiedCount === 0) {
            return res.status(404).json({ message: 'No matching product found' });
        }

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3️⃣ **Update Multiple Products (Example: Increase price for all products)**
app.put('/products/updateMany', async (req, res) => {
    try {
        const result = await Product.updateMany(
            { price: { $lt: 100 } }, 
            { $inc: { price: 10 } }
        );

        res.status(200).json({ message: `Updated ${result.modifiedCount} products` });
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
### **1️⃣ Update by ID (`findByIdAndUpdate`)**
- **Route:** `PUT /products/:id`
- Finds a product by **MongoDB ObjectId** and updates it.
- `{ new: true }` → Returns the updated document.
- `{ runValidators: true }` → Ensures the updated data follows schema rules.

---

### **2️⃣ Update One Document by Condition (`updateOne`)**
- **Route:** `PUT /products/updateOne`
- Finds a product **by title** and updates it.
- Example: Change `"oldTitle": "Laptop"` → `"newTitle": "Gaming Laptop"`.

---

### **3️⃣ Update Multiple Documents (`updateMany`)**
- **Route:** `PUT /products/updateMany`
- Increases price by `10` for all products **where price < 100**.
- Uses `$inc` (increment operator) to modify values.

---

## **🛠️ How to Test**
### **Using Postman or cURL**
1️⃣ **Update by ID**
```sh
PUT http://localhost:3002/products/60a77b7d85a34e3d44f83b3b
Content-Type: application/json

{
    "title": "Updated Product",
    "price": 500
}
```

2️⃣ **Update One Product by Title**
```sh
PUT http://localhost:3002/products/updateOne
Content-Type: application/json

{
    "oldTitle": "Laptop",
    "newTitle": "Gaming Laptop"
}
```

3️⃣ **Update Many Products (Increase price)**
```sh
PUT http://localhost:3002/products/updateMany
```

---

## **🔥 Summary**
| **Method** | **Route** | **Action** |
|------------|----------|------------|
| `findByIdAndUpdate(id, { $set: updatedData })` | `PUT /products/:id` | Update a product by ID |
| `updateOne({ condition }, { $set: updatedData })` | `PUT /products/updateOne` | Update one product by condition (e.g., title) |
| `updateMany({ condition }, { $inc: { price: 10 } })` | `PUT /products/updateMany` | Update multiple products (e.g., increase price) |

---

