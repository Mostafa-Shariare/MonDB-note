### **Mongoose Built-in Schema Validation in Express.js**

Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js, and it provides built-in validation to ensure data integrity before saving it to the database. These validations help enforce data consistency and reduce errors in your application.

---

## **1. Understanding Mongoose Schema Validation**
Mongoose provides several built-in validators that you can apply directly to your schema definitions. These validations are automatically triggered when you try to save a document to the database.

### **List of Built-in Validators**
1. **Required (`required: true`)** – Ensures a field is not empty.
2. **String Length (`minlength` & `maxlength`)** – Sets minimum and maximum string length.
3. **Number Range (`min` & `max`)** – Sets limits on numbers.
4. **Match (`match`)** – Uses a regular expression to validate string patterns.
5. **Enums (`enum`)** – Limits values to a predefined set.
6. **Unique (`unique: true`)** – Ensures no duplicate values exist.
7. **Custom Validation (`validate`)** – Uses custom functions for advanced validation.

---

## **2. Implementing Mongoose Validations in Express.js**
Let's create an Express.js application that uses Mongoose validation.

### **Step 1: Install Dependencies**
```bash
npm init -y
npm install express mongoose
```

### **Step 2: Connect to MongoDB**
Create a file named `server.js` and set up a basic Express and Mongoose connection:

```javascript
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // Middleware to parse JSON

mongoose
  .connect("mongodb://127.0.0.1:27017/validation_demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## **3. Defining a Schema with Built-in Validations**
Let's define a `User` schema with various validation rules.

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"], // Required field with custom error message
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Ensures email is unique
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Regex validation for email format
  },
  age: {
    type: Number,
    min: [18, "Age must be at least 18"], // Minimum value
    max: [100, "Age cannot exceed 100"], // Maximum value
  },
  role: {
    type: String,
    enum: ["admin", "user", "guest"], // Only allow specific values
    required: [true, "Role is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

// Create a User model
const User = mongoose.model("User", userSchema);
```

---

## **4. Using Validations in Express Routes**
### **Creating a User with Validation**
Now, let's create a route to add a new user and handle validation errors.

```javascript
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save(); // Mongoose will validate before saving
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message; // Extracting error messages
      });
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});
```

---

## **5. Testing Validation Errors**
### **Case 1: Missing Required Fields**
#### **Request:**
```json
{
  "email": "invalidemail.com",
  "age": 17,
  "role": "admin"
}
```
#### **Response:**
```json
{
  "errors": {
    "name": "Name is required",
    "password": "Password is required",
    "email": "Invalid email format",
    "age": "Age must be at least 18"
  }
}
```

### **Case 2: Invalid Enum Value**
#### **Request:**
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "age": 25,
  "role": "superadmin",
  "password": "secure123"
}
```
#### **Response:**
```json
{
  "errors": {
    "role": "`superadmin` is not a valid enum value for path `role`."
  }
}
```

---

## **6. Using Custom Validation**
Mongoose also allows defining custom validation functions.

### **Example: Custom Validator for Password Strength**
```javascript
const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value);
      },
      message:
        "Password must be at least 6 characters long, include one uppercase letter and one number",
    },
  },
});
```

#### **Request with Weak Password:**
```json
{
  "password": "weakpass"
}
```
#### **Response:**
```json
{
  "errors": {
    "password": "Password must be at least 6 characters long, include one uppercase letter and one number"
  }
}
```

---

## **7. Disabling Mongoose Validations Temporarily**
If you need to bypass validations for a specific operation, you can use:
```javascript
await user.save({ validateBeforeSave: false });
```
Or for updates:
```javascript
await User.updateOne({ _id: userId }, { age: 17 }, { runValidators: false });
```

---

## **8. Conclusion**
Mongoose built-in validations help ensure that only properly formatted data is saved in MongoDB. You can:
✔ Enforce required fields  
✔ Limit string length or number range  
✔ Validate format using regex  
✔ Restrict values to an enum  
✔ Ensure uniqueness  
✔ Implement custom validation logic  

This approach enhances data consistency and prevents bad data from being stored in your database. 🚀
