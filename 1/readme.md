## **1. Check MongoDB and Mongo Shell Versions**
Before working with MongoDB, you might want to check the installed versions.  

```bash
mongod --version
```
- This command checks the version of the **MongoDB server**.

```bash
mongosh --version
```
- This command checks the version of the **MongoDB shell (mongosh)**.

---

## **2. Start MongoDB Shell**
To interact with the database, you need to open the MongoDB shell.  

```bash
mongosh
```
- This starts the **MongoDB shell**, where you can run commands.

---

## **3. Get Help in MongoDB Shell**
If you're inside `mongosh`, you can use:

```bash
help
```
- This command lists helpful MongoDB shell commands.

---

## **4. Show Available Databases**
To see all databases in your MongoDB server, use:

```bash
show dbs
```
- This lists all available databases.

---

## **5. Create or Switch to a Database**
If you want to create a database (or switch to an existing one), use:

```bash
use studentsDB
```
- If `studentsDB` **already exists**, this command switches to it.  
- If it **doesn't exist**, MongoDB will create it **only when you insert data**.

---

## **6. Create a Collection**
A collection in MongoDB is similar to a table in SQL databases.

```bash
db.createCollection("students")
```
- This explicitly **creates a collection named `students`** in `studentsDB`.

💡 **Note:** In MongoDB, collections are created automatically when you insert data, so `createCollection()` is optional in most cases.

---

## **7. Show Collections**
To list all collections in the current database:

```bash
show collections
```
- This lists all collections inside `studentsDB`.

---

## **8. Drop a Database (Delete a Database)**
If you want to delete a database completely, use:

```bash
db.dropDatabase()
```
- This **deletes the currently selected database**.

### **Example**
Let's say we have a database called **demoDB** with some collections.  

```bash
use demoDB
db.createCollection("employees")
db.createCollection("departments")
show collections
```
Output:
```
employees
departments
```
Now, if we drop `demoDB`:

```bash
db.dropDatabase()
```
Output:
```
{ "dropped" : "demoDB", "ok" : 1 }
```
- This **completely deletes** the `demoDB` and all its collections.

To verify:

```bash
show dbs
```
- `demoDB` will no longer appear in the list.

---

## **Summary**
| Command | Description |
|---------|------------|
| `mongod --version` | Check MongoDB server version |
| `mongosh --version` | Check MongoDB shell version |
| `mongosh` | Start MongoDB shell |
| `help` | Get a list of MongoDB shell commands |
| `show dbs` | List all databases |
| `use studentsDB` | Switch to (or create) `studentsDB` |
| `db.createCollection("students")` | Create a collection named `students` |
| `show collections` | List all collections in the current database |
| `db.dropDatabase()` | Delete the currently selected database |

Let me know if you need more details! 🚀
