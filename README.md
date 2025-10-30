# Simple Authentication System

A simple authentication system with user registration and login functionality using hashed passwords (bcrypt) and JWT tokens.

## Features

- ✅ User Registration with email validation
- ✅ Secure Password Hashing using bcrypt
- ✅ User Login with JWT token generation
- ✅ Protected Routes with JWT verification
- ✅ Input Validation
- ✅ Error Handling

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Lightweight database (file-based, no setup required)
- **Sequelize** - ORM for SQL databases
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token generation and verification
- **express-validator** - Input validation
- **dotenv** - Environment variables

## Project Structure

```
Authentication-And-Authorization-/
├── config/
│   └── database.js          # Database connection
├── middleware/
│   └── auth.js             # Authentication middleware
├── models/
│   └── User.js             # User model with password hashing
├── routes/
│   ├── auth.js             # Authentication routes (register, login)
│   └── user.js             # Protected user routes
├── .env                    # Environment variables
├── .env.example            # Example environment variables
├── .gitignore              # Git ignore file
├── package.json            # Dependencies
└── server.js               # Main server file
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Authentication-And-Authorization-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the values as needed:
   ```
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

   **Note:** SQLite database file (`database.sqlite`) will be automatically created when the server starts. No additional database setup required!

## API Endpoints

### Public Routes

#### 1. Register User
- **URL:** `POST /api/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response (201):**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

#### 2. Login User
- **URL:** `POST /api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

### Protected Routes (Require JWT Token)

#### 3. Get User Profile
- **URL:** `GET /api/user/profile`
- **Headers:**
  ```
  Authorization: Bearer <your_jwt_token>
  ```
- **Success Response (200):**
  ```json
  {
    "success": true,
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-10-29T..."
    }
  }
  ```

#### 4. Get User Dashboard
- **URL:** `GET /api/user/dashboard`
- **Headers:**
  ```
  Authorization: Bearer <your_jwt_token>
  ```
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Welcome to your dashboard, John Doe!",
    "data": {
      "userId": "user_id",
      "email": "john@example.com",
      "memberSince": "2025-10-29T..."
    }
  }
  ```

## Testing the API

You can test the API using **Postman**, **Thunder Client**, **curl**, or any HTTP client.

### Example using curl:

1. **Register a new user:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
   ```

2. **Login:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"john@example.com","password":"password123"}'
   ```

3. **Access protected route (replace <TOKEN> with your JWT token):**
   ```bash
   curl -X GET http://localhost:5000/api/user/profile \
     -H "Authorization: Bearer <TOKEN>"
   ```

## Security Features

1. **Password Hashing:** Passwords are hashed using bcrypt with a salt factor of 10 before storing in the database
2. **JWT Authentication:** Secure token-based authentication with configurable expiration
3. **Password Field Protection:** Passwords are not returned in API responses by default
4. **Input Validation:** Email format and password length validation
5. **Error Handling:** Comprehensive error handling for security and debugging

## Authentication Flow

1. **Registration:**
   - User provides name, email, and password
   - System validates input
   - Password is hashed using bcrypt
   - User is saved to database
   - JWT token is generated and returned

2. **Login:**
   - User provides email and password
   - System finds user by email
   - Password is compared with hashed password
   - If valid, JWT token is generated and returned

3. **Accessing Protected Routes:**
   - User includes JWT token in Authorization header
   - Middleware verifies the token
   - If valid, user data is attached to request
   - Route handler processes the request

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials or token)
- `404` - Not Found
- `500` - Server Error

## License

ISC
