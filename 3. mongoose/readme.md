# Mongoose Collections in Express.js

## Introduction
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, making it easier to work with MongoDB collections in a structured manner. In this project, we use Mongoose to define and manage collections efficiently.

## What are Collections?
In MongoDB, a **collection** is a group of documents, similar to a table in relational databases. Mongoose allows us to create collections using schemas and models.

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

## Defining a Mongoose Collection
Mongoose allows us to define collections using schemas and models.

### Example: Defining a `User` Collection

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```




