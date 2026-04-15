# 🔐 Server-Side Authentication System

This module handles user authentication using **JWT (JSON Web Tokens)** and **bcrypt** for password hashing. It provides secure login and protected route access.

---

## 📦 Features

- User login with email & password
- Password hashing using `bcryptjs`
- JWT token generation
- Token verification middleware
- Protected routes (e.g., `/profile`)
- Secure user data retrieval (excluding password)

---



---

## 🔑 Authentication Flow

1. User submits login credentials  
2. Server verifies credentials  
3. Server generates JWT token  
4. Client stores token (e.g., localStorage)  
5. Client sends token in headers for protected routes  
6. Middleware verifies token before granting access  

---

## 🔐 JWT Token Structure

When a user logs in, a token is generated:

```js
jwt.sign(
  { id: user._id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

## 🧠 JWT Verification

When a protected route is accessed, the server verifies the token using middleware:

```js
const decoded = jwt.verify(token, process.env.JWT_SECRET);