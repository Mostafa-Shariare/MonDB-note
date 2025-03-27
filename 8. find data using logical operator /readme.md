### **Finding Data Using Logical Operators in MongoDB (Express.js)**

In MongoDB, logical operators (`$and`, `$or`, `$not`, `$nor`) allow us to filter documents based on multiple conditions. When using Mongoose with Express.js, we can incorporate these operators in the `find` method.

---

## **Logical Operators in MongoDB**
1. **$and** → Matches documents that satisfy all conditions.
2. **$or** → Matches documents that satisfy at least one condition.
3. **$not** → Matches documents that do *not* satisfy the given condition.
4. **$nor** → Matches documents that do *not* satisfy any of the given conditions.

---

### **Implementing Logical Operators in Express.js**
Using your existing code, let's modify the `/products` route to use different logical operators:

---

### **1. Using `$and` (All conditions must be true)**
Fetch products that have a `price` greater than `100` **AND** a title containing `"phone"`.

```js
app.get('/products/and', async (req, res) => {
    try {
        const products = await Product.find({
            $and: [
                { price: { $gt: 100 } },
                { title: /phone/i } // Case-insensitive regex for "phone"
            ]
        });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

---

### **2. Using `$or` (At least one condition must be true)**
Fetch products where `price` is greater than `500` **OR** the title contains `"laptop"`.

```js
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
```

---

### **3. Using `$not` (Negation)**
Fetch products where the `price` **is NOT** greater than `500`.

```js
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
```

---

### **4. Using `$nor` (None of the conditions should be true)**
Fetch products where `price` is **NOT greater than `500` AND** the title **does NOT contain `"tablet"`**.

```js
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
```

---

