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
- **Environment Management**: dotenv (for managing environment variables)

---

## 🚀 **Project Setup**

### **Prerequisites** 🧰

To get started with the **Login and Register Page** project, ensure you have the following installed on your machine:

- **Node.js** (version 12 or later)
- **npm** (Node package manager)
- **MySQL** server running

### **Installation** 🛠️

1. **Clone the Repository**:
   First, clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/login-signup-node-mysql.git
   cd login-signup-node-mysql

Install Dependencies: Use npm to install all the required dependencies:

bash
Copy code
npm install
Set up MySQL Database:

Create a database in MySQL (e.g., login_signup_db).
Create a users table with fields: id, username, email, and password.
Example SQL schema to create the users table:

sql
Copy code
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
Configure Environment Variables:

Create a .env file in the project root directory.

Add the following variables in the .env file:

makefile
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=login_signup_db
JWT_SECRET=your_jwt_secret_key
Make sure to replace your_jwt_secret_key with a strong secret key for JWT encryption.

Start the Application: Once all dependencies are installed and the database is set up, start the server by running:

bash
Copy code
npm start
The application will now be running on http://localhost:3000.

🔌 API Endpoints
The application exposes the following REST API endpoints for user authentication:

1. POST /api/signup - Register a New User
Request Body:

username (String): The user's chosen username.
email (String): The user's email address.
password (String): The user's password (this will be hashed and stored securely).
Response:

200 OK: Returns a JWT token if the registration is successful.
400 Bad Request: If there is any issue with the registration (e.g., missing fields or invalid email).
Example Request:

json
Copy code
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
Example Response:

json
Copy code
{
  "message": "User registered successfully",
  "token": "your_jwt_token"
}
2. POST /api/login - Log in with Existing Credentials
Request Body:

email (String): The user's email address.
password (String): The user's password.
Response:

200 OK: Returns a JWT token upon successful login.
401 Unauthorized: If the email or password is incorrect.
Example Request:

json
Copy code
{
  "email": "john@example.com",
  "password": "password123"
}
Example Response:

json
Copy code
{
  "message": "Login successful",
  "token": "your_jwt_token"
}
🔐 Authentication with JWT
The system uses JSON Web Tokens (JWT) to authenticate users:

Sign Up: When a user registers, their password is hashed using bcrypt.js, and their data is saved in the MySQL database. A JWT is generated using a secret key and returned to the user.

Login: When a user logs in with their credentials, the system verifies their email and password. If the credentials are correct, a JWT token is returned to the user.

Protected Routes: Users need to include the JWT token in the Authorization header of their requests to access protected routes. If the token is valid, they can access the resource; otherwise, the request will be denied.

⚠️ Challenges Faced
Password Security: Ensuring that passwords are securely hashed and not stored in plain text. bcrypt.js was used to hash passwords, and the system ensures that only hashed passwords are stored.
JWT Expiry: Managing token expiry times and handling token refresh or re-login scenarios.
SQL Injection Protection: Used prepared statements to ensure the system is safe from SQL injection attacks.
🚀 Future Enhancements
Password Reset: Implement a password reset feature using email.
User Roles: Add user roles (e.g., admin, user) to control access to different parts of the system.
Rate Limiting: Implement rate limiting to prevent brute-force attacks on login endpoints.
Front-End Integration: Create a front-end application to interact with the backend and allow users to sign up, log in, and access protected content.
📝 Conclusion
The Login and Register Page using Node.js provides a secure and scalable user authentication system using JWT tokens and bcrypt.js for password hashing. By combining Node.js, MySQL, and modern authentication techniques, this project serves as a foundational structure for any web application that requires secure user authentication.

📢 Disclaimer
This system processes sensitive user data such as email and password. Proper security measures should be implemented, including secure HTTPS connections and token expiration management. Always ensure that user data is stored and transmitted securely.
