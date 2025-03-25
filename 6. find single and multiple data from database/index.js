const express = require('express');
const mongoose = require('mongoose');
const { type } = require('os');
const { title } = require('process');
const app = express();
const port = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//create a product schema
const productsSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,    
    createdAt: {
        type: Date, 
        default: Date.now
    }                        
})

//crate a product model
const Product = mongoose.model('Products', productsSchema);

mongoose.connect('mongodb://localhost:27017/test')
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));             

app.listen(port, () => console.log('Server is running on port 3002'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//CRUD===Create, Read, Update, Delete

//create
app.post('/products',async(req, res) => {
                      
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

app.get('/products', async (req, res) => {
    try {  
        //const products = await Product.find().limit(10);                                 
        const products = await Product.find();
        if(products){
            res.status(200).json(products);
        }else{
            res.status(404).json({ message: 'No products found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }       
});

app.get('/products/:id', async (req, res) => {
    try {  
        const id = req.params.id;                       
        //const products = await Product.find().limit(10);                                 
        const products = await Product.find({_id: id}).select({title: 1, price: 1, _id: 0});  
        if(products){
            res.status(200).json(products);
        }else{
            res.status(404).json({ message: 'No products found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }       
});

  
//Get: /products => get all products
//get: /products/:id => get a product by id
//POST: /products => create a new product
//PUT: /products/:id => update a product by id
//DELETE: /products/:id => delete a product by id
