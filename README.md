# MongoDB Installation Guide (Windows)

MongoDB is a NoSQL database that stores data in JSON-like documents. Follow the steps below to install MongoDB on Windows.

## Prerequisites
- Windows 10 or later
- Administrator privileges

## Step 1: Download MongoDB
1. Visit the official MongoDB website:  
   [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
2. Select **Windows** as the OS.
3. Download the **MSI (Windows Installer) package**.

## Step 2: Install MongoDB
1. Run the **MSI installer**.
2. Accept the **license agreement**.
3. Choose **Complete** installation.
4. Select **Run MongoDB as a Windows Service**.
5. Click **Install** and wait for completion.

## Step 3: Setup MongoDB Environment
1. Open **Command Prompt (cmd)** and go to the MongoDB installation folder:
   ```sh
   cd C:\Program Files\MongoDB\Server\6.0\bin
