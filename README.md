# Login_and_Register_Page_using_Nodejs


Overview
This project implements a simple login and signup system with authentication using Node.js and MySQL. The application allows users to create an account, log in, and access protected routes.

Features
User Registration (Signup)
User Login
Authentication using JWT (JSON Web Tokens)
Secure password storage with bcrypt
MySQL database for user data storage

Technologies Used
Backend: Node.js, Express
Database: MySQL
Authentication: JWT (JSON Web Tokens)
Password Encryption: bcrypt.js
Environment Management: dotenv

Project Setup

Prerequisites
Node.js and npm installed on your machine
MySQL server running

Installation
Clone the repository:
code
git clone https://github.com/yourusername/login-signup-node-mysql.git
cd login-signup-node-mysql
Install dependencies:

code
npm install
Set up MySQL database:

Create a database in MySQL (e.g., login_signup_db).
Create a users table with fields: id, username, email, password.
Example SQL schema:

code
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
Configure environment variables: Create a .env file and add the following:

makefile
code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=login_signup_db
JWT_SECRET=your_jwt_secret_key
Start the application:

code
npm start
The server will run on http://localhost:3000.

API Endpoints
POST /api/signup - Register a new user.

Body: username, email, password
Returns: JWT token upon successful registration.
POST /api/login - Log in with existing credentials.

Body: email, password
Returns: JWT token upon successful login.