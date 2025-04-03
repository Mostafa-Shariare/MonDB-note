# **Mongoose Custom Schema Validation in Express.js**  

Mongoose provides built-in schema validation, but sometimes, you need to enforce more complex rules that built-in validators can't handle. For such cases, Mongoose allows **custom validation functions**.

---

## **1. Why Use Custom Schema Validation?**  
Custom validation is useful when:  
✔ You need to validate passwords (e.g., must contain uppercase, lowercase, numbers, special characters).  
✔ You need to check if an input matches specific conditions.  
✔ You want to compare two fields (e.g., `confirmPassword` should match `password`).  
✔ You need to validate an input asynchronously, such as checking if an email is already in use.  

---

## **2. How to Define Custom Validators in Mongoose?**  

Custom validation can be defined using the `validate` property inside a schema field.  
It takes a function that returns **true** (valid) or **false** (invalid), along with a custom error message.

### **Syntax of Custom Validation**
```javascript
const schema = new mongoose.Schema({
  fieldName: {
    type: DataType,
    validate: {
      validator: function (value) {
        return booleanExpression; // true (valid) or false (invalid)
      },
      message: "Custom error message",
    },
  },
});
```

---

## **3. Examples of Custom Validation**
### **Example 1: Password Strength Validation**
Let's say we want to ensure that a password:
✔ Has at least **6 characters**  
✔ Includes at least **one uppercase letter**  
✔ Includes at least **one number**  

#### **Schema with Custom Validation**
```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
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

const User = mongoose.model("User", userSchema);
```

#### **Invalid Request**
```json
{
  "username": "John",
  "password": "weakpass"
}
```
#### **Response**
```json
{
  "errors": {
    "password": "Password must be at least 6 characters long, include one uppercase letter and one number"
  }
}
```

---

### **Example 2: Age Validation**
We want to ensure the user's age is **between 18 and 60**, but with a custom validation function.

#### **Schema**
```javascript
const userSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 18 && value <= 60;
      },
      message: (props) => `${props.value} is not a valid age! Age must be between 18 and 60.`,
    },
  },
});
```

#### **Invalid Request**
```json
{
  "age": 65
}
```
#### **Response**
```json
{
  "errors": {
    "age": "65 is not a valid age! Age must be between 18 and 60."
  }
}
```

---

### **Example 3: Asynchronous Validation**
Sometimes, we need to check if a value exists in the database before allowing the user to save data.

#### **Use Case: Unique Email Validation**
Although Mongoose has a `unique: true` constraint, it only works at the **index level** and doesn't provide a validation error before saving.  
To ensure uniqueness **before saving**, we use an **async validator**.

#### **Schema with Async Validation**
```javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: async function (value) {
        const existingUser = await mongoose.models.User.findOne({ email: value });
        return !existingUser; // Return false if email exists
      },
      message: "Email already exists",
    },
  },
});

const User = mongoose.model("User", userSchema);
```

#### **Invalid Request**
```json
{
  "email": "existing@example.com"
}
```
#### **Response**
```json
{
  "errors": {
    "email": "Email already exists"
  }
}
```

---

### **Example 4: Confirm Password Validation**
We want to ensure that `confirmPassword` matches `password`.

#### **Schema with Field Comparison**
```javascript
const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value === this.password; // Compare with password
      },
      message: "Passwords do not match",
    },
  },
});
```

#### **Invalid Request**
```json
{
  "password": "StrongPass123",
  "confirmPassword": "WeakPass"
}
```
#### **Response**
```json
{
  "errors": {
    "confirmPassword": "Passwords do not match"
  }
}
```

---

## **4. Handling Validation Errors in Express.js**
When a validation error occurs, Mongoose throws a `ValidationError`.  
We can handle it in our Express route like this:

```javascript
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});
```

---

## **5. When to Use Custom Validation vs Middleware**
| **Scenario** | **Use Custom Validation?** | **Use Middleware?** |
|-------------|-----------------|-----------------|
| Validate input format (e.g., email, password strength) | ✅ Yes | ❌ No |
| Compare fields (e.g., password & confirm password) | ✅ Yes | ❌ No |
| Check uniqueness (before saving) | ✅ Yes (async validation) | ❌ No |
| Modify or hash values before saving (e.g., hashing password) | ❌ No | ✅ Yes (pre-save middleware) |

For modifying data (e.g., hashing a password before saving), use **Mongoose middleware** (`pre('save', function() {...})`).

---

## **6. Conclusion**
✅ **Built-in validators** are useful for basic checks like `required`, `minlength`, and `enum`.  
✅ **Custom validators** allow complex validations such as field comparisons, regex-based validation, and async database checks.  
✅ **Handling validation errors properly** in Express ensures clear error messages for users.  

Custom validation helps ensure data integrity before it reaches the database, making applications more **robust and error-proof**! 🚀
