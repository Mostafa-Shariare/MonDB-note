## **📌 Common MongoDB Comparison Operators**
| Operator | Description | Example |
|----------|-------------|---------|
| `$eq` | Matches values that are **equal** to a specified value | `{ price: { $eq: 100 } }` |
| `$ne` | Matches values that are **not equal** to a specified value | `{ price: { $ne: 100 } }` |
| `$gt` | Matches values that are **greater than** a specified value | `{ price: { $gt: 100 } }` |
| `$gte` | Matches values that are **greater than or equal to** a specified value | `{ price: { $gte: 100 } }` |
| `$lt` | Matches values that are **less than** a specified value | `{ price: { $lt: 100 } }` |
| `$lte` | Matches values that are **less than or equal to** a specified value | `{ price: { $lte: 100 } }` |
| `$in` | Matches any of the values specified in an array | `{ price: { $in: [100, 200, 300] } }` |
| `$nin` | Matches values that **do not exist** in an array | `{ price: { $nin: [100, 200] } }` |

---

## **🔹 Implementing Comparison Queries in the Existing Code**
Let's modify the `/products` GET API to support **comparison queries**.

### **📝 Updated Code: Fetch Products with Filters**
```js
app.get('/products', async (req, res) => {
    try {  
        let query = {};

        // Check if query parameters are provided
        if (req.query.minPrice) {
            query.price = { $gte: Number(req.query.minPrice) }; // Greater than or equal to minPrice
        }
        if (req.query.maxPrice) {
            query.price = { ...query.price, $lte: Number(req.query.maxPrice) }; // Less than or equal to maxPrice
        }
        if (req.query.title) {
            query.title = { $regex: req.query.title, $options: 'i' }; // Case-insensitive search
        }

        const products = await Product.find(query);
        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ message: 'No products found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

---

## **🔹 How This Works**
- **If `minPrice` is provided**, it fetches products where `price >= minPrice`.
- **If `maxPrice` is provided**, it fetches products where `price <= maxPrice`.
- **If both `minPrice` and `maxPrice` are provided**, it fetches products within that range.
- **If `title` is provided**, it fetches products that contain the search term in a case-insensitive manner.

---

## **🔹 Testing the API with Query Parameters**
### **1️⃣ Get products with price greater than or equal to 100**
```
GET http://localhost:3002/products?minPrice=100
```

### **2️⃣ Get products with price between 50 and 200**
```
GET http://localhost:3002/products?minPrice=50&maxPrice=200
```

### **3️⃣ Get products with a title containing "phone" (case insensitive)**
```
GET http://localhost:3002/products?title=phone
```

---

## **🔹 More Examples Using Comparison Operators**
#### **Find all products except those with price 500**
```js
const products = await Product.find({ price: { $ne: 500 } });
```
✅ This fetches all products except those priced at **500**.

---

#### **Find products priced either 100, 200, or 300**
```js
const products = await Product.find({ price: { $in: [100, 200, 300] } });
```
✅ This fetches all products where `price` is either **100, 200, or 300**.

---

#### **Find products NOT priced at 100 or 200**
```js
const products = await Product.find({ price: { $nin: [100, 200] } });
```
✅ This fetches all products except those priced at **100 or 200**.

---

## **🔹 Summary**
| Query | Example | Description |
|--------|---------|-------------|
| `price >= 100` | `{ price: { $gte: 100 } }` | Finds products with price **greater than or equal** to 100 |
| `price <= 200` | `{ price: { $lte: 200 } }` | Finds products with price **less than or equal** to 200 |
| `price between 100 and 200` | `{ price: { $gte: 100, $lte: 200 } }` | Finds products within the price range **100 to 200** |
| `title contains "phone"` | `{ title: { $regex: "phone", $options: "i" } }` | Finds products with **"phone" in the title** (case insensitive) |

---

