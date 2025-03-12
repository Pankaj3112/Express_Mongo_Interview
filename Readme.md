# MongoDB Interview Sandbox

This repository is designed to test MongoDB and Node.js skills in an interview setting.

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/YOUR_USERNAME/mongodb-interview-sandbox.git
cd mongodb-interview-sandbox
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
MONGO_URI=mongodb://127.0.0.1:27017/interviewDB
PORT=5000
```

### 4️⃣ Seed the Database
Run the following command to populate the database with sample data:
```sh
npm run seed
```

### 5️⃣ Start the Development Server
```sh
npm run dev
```
This will start the server at `http://localhost:5000`.

## 📌 API Endpoints

- **GET /users** - Fetch all users
- **POST /users** - Create a new user
- **GET /orders** - Fetch all orders with user details

## ✅ Ready to Begin!
Once the setup is complete, you're ready to start answering interview questions related to MongoDB, Express.js, and Node.js.
