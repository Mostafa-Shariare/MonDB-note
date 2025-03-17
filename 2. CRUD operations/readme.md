MongoDB CRUD operations refer to the four fundamental operations used to interact with a database:  

- **C**: Create → Insert new documents into a collection.  
- **R**: Read → Retrieve documents from a collection.  
- **U**: Update → Modify existing documents.  
- **D**: Delete → Remove documents from a collection.  

MongoDB stores data in **JSON-like documents** inside **collections**, which are similar to tables in relational databases.

---

## **1. Create (Insert) Operation**
The `insert` operation is used to add new documents into a collection.  

### **Methods**  
- `insertOne(document)`: Inserts a single document.  
- `insertMany([document1, document2, ...])`: Inserts multiple documents at once.

### **Example**
```javascript
// Insert one document
db.users.insertOne({
    name: "John Doe",
    age: 25,
    email: "john@example.com"
});

// Insert multiple documents
db.users.insertMany([
    { name: "Alice", age: 30, email: "alice@example.com" },
    { name: "Bob", age: 28, email: "bob@example.com" }
]);
```

---

## **2. Read (Find) Operation**
The `find` operation retrieves data from a collection.

### **Methods**
- `find(query)`: Fetches multiple documents matching the query.
- `findOne(query)`: Fetches a single document matching the query.

### **Example**
```javascript
// Find all users
db.users.find();

// Find users with age 25
db.users.find({ age: 25 });

// Find a single user with the name "Alice"
db.users.findOne({ name: "Alice" });

// Find all users but only return the name and email fields (projection)
db.users.find({}, { name: 1, email: 1, _id: 0 });
```

### **Operators in Queries**
- `$gt` (greater than), `$lt` (less than), `$gte` (greater than or equal), `$lte` (less than or equal)
- `$in`, `$nin` (values inside/outside a given list)
- `$or`, `$and`, `$not`, `$nor` (logical operators)
- `$exists`, `$type` (check field existence/type)

**Example with Operators**
```javascript
// Find users older than 25
db.users.find({ age: { $gt: 25 } });

// Find users whose name is "Alice" OR age is 30
db.users.find({ $or: [{ name: "Alice" }, { age: 30 }] });
```

---

## **3. Update Operation**
Used to modify existing documents.

### **Methods**
- `updateOne(filter, update)`: Updates the first matching document.
- `updateMany(filter, update)`: Updates all matching documents.
- `replaceOne(filter, newDocument)`: Replaces an entire document.

### **Example**
```javascript
// Update a single user’s age
db.users.updateOne(
    { name: "John Doe" }, // Filter
    { $set: { age: 26 } } // Update operation
);

// Update multiple users' age to 29 where age is 28
db.users.updateMany(
    { age: 28 },
    { $set: { age: 29 } }
);

// Replace a document completely
db.users.replaceOne(
    { name: "Bob" },
    { name: "Robert", age: 32, email: "robert@example.com" }
);
```

### **Update Operators**
- `$set`: Modifies specific fields.
- `$inc`: Increments a number field.
- `$rename`: Renames a field.
- `$unset`: Removes a field.
- `$push`: Adds an element to an array.
- `$pull`: Removes an element from an array.

**Example with Operators**
```javascript
// Increment age by 1
db.users.updateOne(
    { name: "John Doe" },
    { $inc: { age: 1 } }
);

// Remove the email field from all documents
db.users.updateMany(
    {},
    { $unset: { email: "" } }
);
```

---

## **4. Delete Operation**
Removes documents from a collection.

### **Methods**
- `deleteOne(filter)`: Deletes the first matching document.
- `deleteMany(filter)`: Deletes all matching documents.

### **Example**
```javascript
// Delete one user
db.users.deleteOne({ name: "Alice" });

// Delete all users with age 30
db.users.deleteMany({ age: 30 });

// Delete all documents (Warning: clears the collection)
db.users.deleteMany({});
```

---

## **Additional Notes**
### **1. Indexing for Faster Queries**
Indexes improve query performance.
```javascript
db.users.createIndex({ email: 1 });
```

### **2. Aggregation for Complex Queries**
Aggregation is used for advanced data processing.
```javascript
db.users.aggregate([
    { $match: { age: { $gt: 25 } } },
    { $group: { _id: "$age", count: { $sum: 1 } } }
]);
```

### **3. Transactions in MongoDB**
To ensure multiple operations either succeed together or fail.
```javascript
const session = db.getMongo().startSession();
session.startTransaction();
try {
    session.getDatabase("testDB").users.insertOne({ name: "Eve" });
    session.getDatabase("testDB").orders.insertOne({ order: "Laptop" });
    session.commitTransaction();
} catch (error) {
    session.abortTransaction();
}
session.endSession();
```

---

## **Conclusion**
MongoDB CRUD operations allow you to:
1. **Create** (`insertOne`, `insertMany`)
2. **Read** (`find`, `findOne`)
3. **Update** (`updateOne`, `updateMany`, `replaceOne`)
4. **Delete** (`deleteOne`, `deleteMany`)
