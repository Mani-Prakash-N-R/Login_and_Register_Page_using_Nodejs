# 🔑 **Login and Register Page Using Node.js**

## **Overview** 🌐
This project implements a **simple login and signup system** with **authentication** using **Node.js** and **MySQL**. The application allows users to **create an account**, **log in**, and access protected routes. This system uses **JWT (JSON Web Tokens)** for secure authentication, ensuring that only authorized users can access certain resources.

---

## 📋 **Features** ✨
- **User Registration (Signup)**: Allows users to create an account.
- **User Login**: Users can log in with their credentials (email and password).
- **JWT Authentication**: Implements **JSON Web Tokens** to securely authenticate users.
- **Password Encryption**: Uses **bcrypt.js** to securely hash and store user passwords.
- **MySQL Database**: Stores user data (username, email, and encrypted password).

---

## 🛠️ **Technologies Used** ⚙️
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Encryption**: bcrypt.js
- **Environment Management**: dotenv

---

## 🚀 **Project Setup**

### **Prerequisites** 🧰
Ensure the following are installed:
- **Node.js** (version 12 or later)
- **npm** (Node package manager)
- **MySQL** server running

### **Installation** 🛠️

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/login-signup-node-mysql.git
   cd login-signup-node-mysql
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set up MySQL Database**:
   Create a database and table:
   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(255) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL
   );
   ```

4. **Configure Environment Variables**:
   Create a `.env` file and add the following variables:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=login_signup_db
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Start the Application**:
   ```bash
   npm start
   ```
   The application will run at `http://localhost:3000`.

---

## 🔌 **API Endpoints**

1. **POST /api/signup**: Register a New User
   - Request body: 
     ```json
     {
       "username": "john_doe",
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - Response:
     ```json
     {
       "message": "User registered successfully",
       "token": "your_jwt_token"
     }
     ```

2. **POST /api/login**: Log in with Existing Credentials
   - Request body:
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - Response:
     ```json
     {
       "message": "Login successful",
       "token": "your_jwt_token"
     }
     ```

---

## 🔐 **Authentication with JWT**

- **Sign Up**: Hash password with **bcrypt.js** and return a JWT.
- **Login**: Verify credentials, return JWT if valid.
- **Protected Routes**: Include the JWT token in the Authorization header to access protected routes.

---

## ⚠️ **Challenges Faced**
- **Password Security**: Passwords are hashed using bcrypt.js to prevent storage of plain-text passwords.
- **JWT Expiry**: Managing JWT expiration and handling re-login.
- **SQL Injection Protection**: Used prepared statements to prevent SQL injection.

---

## 🚀 **Future Enhancements**
- **Password Reset**: Implement password reset via email.
- **User Roles**: Add roles (admin, user) to control access.
- **Rate Limiting**: Implement to prevent brute-force attacks.
- **Front-End Integration**: Create a front-end to interact with the backend.

---

## 📝 **Conclusion**
The **Login and Register Page** using Node.js provides a secure authentication system with JWT and bcrypt.js for password hashing. This project serves as a foundational structure for any web application requiring secure user authentication.



## 📢 **Disclaimer**
Ensure sensitive user data (email, password) is handled securely with HTTPS connections and proper token expiration management.
```
