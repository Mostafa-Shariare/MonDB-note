## Setting Up Express.js with Mongoose
To use Mongoose in an Express.js application, we first need to set up a connection to MongoDB.

### Example Code:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3002;

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
```

### Explanation
- **Express Setup:** We create an Express.js server that listens on port `3002`.
- **MongoDB Connection:** Mongoose connects to the local MongoDB instance at `mongodb://localhost:27017/test`.
- **Error Handling:** If the connection fails, an error message is logged.
- **Basic Route:** The `/` route responds with `Hello World!`.

## Defining a Mongoose Schema and Model
Mongoose allows us to define collections using schemas and models.

### Example: Defining a `Product` Collection

```javascript
const mongoose = require('mongoose');

// Create a product schema
const productsSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,    
    createdAt: {
        type: Date,
        default: Date.now
    }                        
})

// Create a product model
const Product = mongoose.model('Products', productsSchema);

module.exports = Product;
```

### Explanation
- **Schema (`productsSchema`)**:
  - Defines the structure of a product document in the collection.
  - The `title`, `price`, and `description` fields store product information.
  - The `createdAt` field stores a timestamp and defaults to the current date.
- **Model (`Product`)**:
  - Represents the `Products` collection in MongoDB.
  - Used to create, read, update, and delete product records in the database.



