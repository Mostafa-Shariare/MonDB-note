# **📌 Explanation: Saving Data in MongoDB from an Express.js Server**
This code sets up a **REST API** using **Express.js** and **MongoDB** to store product details in a database.

---

## **1️⃣ Install Required Packages**
Before running the code, ensure you have **Node.js** installed, then install the necessary npm packages:

```sh
npm install express mongoose
```

---

## **2️⃣ Import Required Modules**
At the beginning of the file, you import necessary Node.js modules.

```javascript
const express = require('express');  // Import Express.js
const mongoose = require('mongoose'); // Import Mongoose
const { type } = require('os'); // (Unused import, can be removed)
const { title } = require('process'); // (Unused import, can be removed)
```

**🔹 What They Do:**
- `express`: Creates an HTTP server and defines routes.
- `mongoose`: Allows communication with MongoDB.

---

## **3️⃣ Create an Express App and Define Middleware**
```javascript
const app = express();
const port = 3002;
```
- `app` initializes the Express server.
- `port = 3002` sets the server to listen on port **3002**.

### **Enable JSON and URL-Encoded Data Parsing**
```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```
- `express.json()`: Parses incoming JSON data from the request body.
- `express.urlencoded({ extended: true })`: Parses URL-encoded data.

---

## **4️⃣ Define a Mongoose Schema**
```javascript
const productsSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,    
    createdAt: {
        type: Date, 
        default: Date.now
    }                        
});
```
This schema defines the structure of a **Product** document in MongoDB.

🔹 **Schema Breakdown**:
| Field       | Type   | Description |
|-------------|--------|-------------|
| `title`     | String | Name of the product |
| `price`     | Number | Product price |
| `description` | String | Product details |
| `createdAt` | Date | Defaults to the current timestamp |

---

## **5️⃣ Create a Mongoose Model**
```javascript
const Product = mongoose.model('Products', productsSchema);
```
- `Product`: Represents the **"Products"** collection in MongoDB.
- The collection name in MongoDB will be **"products"** (Mongoose automatically pluralizes it).

---

## **6️⃣ Connect to MongoDB**
```javascript
mongoose.connect('mongodb://localhost:27017/test')
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));
```
🔹 **What Happens Here?**
- Connects to a MongoDB database named `test`.
- If successful, logs: ✅ `"Connected to MongoDB"`
- If failed, logs an error message.

📌 **Make sure MongoDB is running locally before testing!**
Run:
```sh
mongod
```
or
```sh
mongosh
```

---

## **7️⃣ Start the Server**
```javascript
app.listen(port, () => console.log('Server is running on port 3002'));
```
- Starts the Express server on **port 3002**.
- You can access the server via **http://localhost:3002/**.

---

## **8️⃣ Define API Endpoints**

### **GET Route: Home Page**
```javascript
app.get('/', (req, res) => {
    res.send('Hello World!');
});
```
- When visiting **http://localhost:3002/**, it responds with `"Hello World!"`.

---

### **POST Route: Save a Product in MongoDB**
```javascript
app.post('/products', async (req, res) => {
    try {
        const title = req.body.title;
        const price = req.body.price;
        const description = req.body.description;

        const product = new Product({ title, price, description });
        const productData = await product.save();                            

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

🔹 **What Happens Here?**
1. **Receives** `title`, `price`, and `description` from the request body.
2. **Creates** a new `Product` document.
3. **Saves** the document in MongoDB.
4. **Responds** with the saved product.

📌 **Test the API using Postman:**
1. Open **Postman**.
2. Set method to **POST**.
3. Enter **http://localhost:3002/products**.
4. Go to **Body → raw → JSON**, and send:
   ```json
   {
     "title": "Laptop",
     "price": 1500,
     "description": "A high-performance laptop."
   }
   ```
5. Click **Send**.

✅ **Response Example:**
```json
{
    "_id": "65cabc1234567890abcd1234",
    "title": "Laptop",
    "price": 1500,
    "description": "A high-performance laptop.",
    "createdAt": "2025-03-21T12:00:00.000Z",
    "__v": 0
}
```

---

## **9️⃣ Verify Data in MongoDB**
Use **MongoDB Compass** or run:

```sh
mongo
use test
db.products.find().pretty()
```

---
