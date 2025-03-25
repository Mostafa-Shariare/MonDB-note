## 1️⃣ Finding Multiple Documents

### **Using `.find()`**
The `.find()` method is used to retrieve multiple documents from the database that match the given query.

#### **Syntax:**
```js
Model.find(query, projection, options)
```
- `query`: An object specifying the conditions for fetching data.
- `projection`: (Optional) Specifies the fields to return (0 to exclude, 1 to include).
- `options`: (Optional) Additional options like `limit`, `sort`, `skip`.

#### **Example 1: Fetch All Products**
```js
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find(); // Finds all products
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```
✅ **This fetches all documents from the `products` collection**.

---

#### **Example 2: Fetch the First 10 Products**
```js
const products = await Product.find().limit(10);
```
✅ **This fetches only the first 10 products from the database**.

---

#### **Example 3: Find Products with a Specific Price**
```js
const products = await Product.find({ price: { $gt: 100 } });
```
✅ **This finds all products where the `price` is greater than 100**.

---

#### **Example 4: Find Specific Fields of Multiple Products**
```js
const products = await Product.find({}, { title: 1, price: 1, _id: 0 });
```
✅ **This fetches all products but only returns the `title` and `price` fields while excluding `_id`**.

---

## 2️⃣ Finding a Single Document

### **Using `.findOne()`**
The `.findOne()` method is used when we want to retrieve only **one document** that matches the query.

#### **Syntax:**
```js
Model.findOne(query, projection)
```
- Returns the **first matching document**.

#### **Example: Find a Product by Title**
```js
const product = await Product.findOne({ title: 'Laptop' });
```
✅ **This finds the first product in the database with the title `'Laptop'`**.

---

### **Using `.findById()`**
If we have the **ObjectId** of a document, we can use `.findById()` to retrieve it.

#### **Syntax:**
```js
Model.findById(id, projection)
```
- Returns **a single document** with the specified `_id`.

#### **Example: Find a Product by ID**
```js
app.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```
✅ **This fetches a product based on its `_id`**.

---

## 3️⃣ Difference Between `.find()`, `.findOne()`, and `.findById()`

| Method | Returns | When to Use? |
|--------|---------|--------------|
| `.find()` | **Array of matching documents** | When you need multiple documents that match the query |
| `.findOne()` | **A single document** | When you need only the first matching document |
| `.findById()` | **A single document by `_id`** | When you need a document based on its `_id` |

---

## 4️⃣ Handling Errors

- Always use `try...catch` to handle database errors.
- Check if the document exists before sending a response.

#### **Example: Handling Errors When Finding a Product**
```js
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

---
