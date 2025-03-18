const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3002;

mongoose.connect('mongodb://localhost:27017/test')
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));             

app.listen(port, () => console.log('Server is running on port 3002'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
  
