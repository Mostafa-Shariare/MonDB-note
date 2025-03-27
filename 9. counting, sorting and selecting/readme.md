## **1️⃣ Counting Data**
MongoDB provides the `.countDocuments()` method to count documents matching a query.

### **Example: Count Products Over a Certain Price**
```js
app.get('/products/count', async (req, res) => {
    try {
        const count = await Product.countDocuments({ price: { $gt: 100 } });
        res.status(200).json({ totalProducts: count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```
### **How It Works**
- **`countDocuments({ price: { $gt: 100 } })`** → Counts all products where price is **greater than 100**.
- Returns the total count as `{ totalProducts: count }`.

---

## **2️⃣ Sorting Data**
MongoDB provides the `.sort()` method to **sort results** in **ascending (`1`) or descending (`-1`) order**.

### **Example: Sort Products by Price (Ascending & Descending)**
```js
app.get('/products/sort', async (req, res) => {
    try {
        const order = req.query.order === 'desc' ? -1 : 1; // Default: Ascending
        const products = await Product.find().sort({ price: order });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```
### **How It Works**
- **`sort({ price: 1 })`** → Sorts in ascending order.
- **`sort({ price: -1 })`** → Sorts in descending order.
- **Query Parameter (`?order=desc`)** allows dynamic sorting.

#### **Test URL**
- **Ascending Order** → `http://localhost:3002/products/sort`
- **Descending Order** → `http://localhost:3002/products/sort?order=desc`

---

## **3️⃣ Selecting Specific Fields**
MongoDB allows fetching only specific fields using `.select()`.

### **Example: Select Only `title` and `price`**
```js
app.get('/products/select', async (req, res) => {
    try {
        const products = await Product.find().select('title price -_id');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```
### **How It Works**
- **`select('title price -_id')`** → Fetches only `title` and `price`, excluding `_id`.
- **`-fieldName`** means **exclude** that field.

#### **Test URL**
- **`http://localhost:3002/products/select`** → Returns only `title` and `price` for each product.

---

## **4️⃣ Combining All Operations**
You can combine **counting, sorting, and selecting** in a single API.

### **Example: Get Sorted Products, Count, and Specific Fields**
```js
app.get('/products/advanced', async (req, res) => {
    try {
        const order = req.query.order === 'desc' ? -1 : 1; // Sorting order
        const count = await Product.countDocuments(); // Count total products
        const products = await Product.find().sort({ price: order }).select('title price -_id'); // Sort and select fields

        res.status(200).json({ total: count, products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```
### **How It Works**
- **Counts total products.**
- **Sorts by price** (default: ascending).
- **Selects only `title` and `price`.**

#### **Test URL**
- **`http://localhost:3002/products/advanced`**
- **`http://localhost:3002/products/advanced?order=desc`**

---

## **📌 Summary**
| Feature  | Method Used | Example |
|----------|------------|---------|
| **Counting** | `.countDocuments()` | `GET /products/count` |
| **Sorting** | `.sort({ field: 1 })` | `GET /products/sort?order=desc` |
| **Selecting** | `.select('field1 field2 -_id')` | `GET /products/select` |
| **Combined** | `.countDocuments().sort().select()` | `GET /products/advanced?order=desc` |

