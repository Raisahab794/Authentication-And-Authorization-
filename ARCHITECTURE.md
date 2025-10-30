# Authentication System Architecture

## Project Structure
```
Authentication-And-Authorization-/
├── config/
│   └── database.js          # MongoDB connection setup
│
├── middleware/
│   └── auth.js             # JWT token verification middleware
│
├── models/
│   └── User.js             # User schema with password hashing
│
├── routes/
│   ├── auth.js             # Public routes (register, login)
│   └── user.js             # Protected routes (profile, dashboard)
│
├── .env                    # Environment variables (not in git)
├── .env.example            # Environment variables template
├── .gitignore              # Files to ignore in git
├── API_TESTING.md          # API testing guide
├── package.json            # Project dependencies
├── QUICKSTART.md           # Quick start guide
├── README.md               # Full documentation
└── server.js               # Main application entry point
```

## Authentication Flow Diagram

### Registration Flow
```
1. User sends registration data
   ↓
2. Server validates input (name, email, password)
   ↓
3. Check if user already exists
   ↓
4. Hash password with bcrypt (salt: 10)
   ↓
5. Save user to MongoDB
   ↓
6. Generate JWT token
   ↓
7. Return token + user data (without password)
```

### Login Flow
```
1. User sends credentials (email, password)
   ↓
2. Server validates input
   ↓
3. Find user by email (include password field)
   ↓
4. Compare password with hashed password using bcrypt
   ↓
5. If match: Generate JWT token
   ↓
6. Return token + user data (without password)
```

### Protected Route Access Flow
```
1. User sends request with JWT token in header
   ↓
2. Auth middleware intercepts request
   ↓
3. Extract token from "Authorization: Bearer <token>"
   ↓
4. Verify token using JWT_SECRET
   ↓
5. Decode token to get user ID
   ↓
6. Find user in database
   ↓
7. Attach user to request object (req.user)
   ↓
8. Route handler accesses req.user
   ↓
9. Return requested data
```

## Security Features

### 1. Password Hashing
```javascript
// In User model (models/User.js)
- Password is never stored in plain text
- bcrypt generates a salt (random data)
- Salt + password = hashed password
- Hash is stored in database
- One-way function (cannot reverse)
```

### 2. JWT Token
```javascript
// Token structure
{
  header: {
    alg: "HS256",
    typ: "JWT"
  },
  payload: {
    id: "user_id",
    iat: "issued_at_time",
    exp: "expiration_time"
  },
  signature: "encrypted_with_JWT_SECRET"
}
```

### 3. Password Comparison
```javascript
// Login process
- User provides plain text password
- bcrypt hashes it with the same salt
- Compares with stored hash
- Returns true/false
```

## API Endpoints Overview

### Public Endpoints (No Token Required)
```
POST /api/auth/register  - Create new user account
POST /api/auth/login     - Authenticate and get token
```

### Protected Endpoints (Token Required)
```
GET /api/user/profile    - Get current user information
GET /api/user/dashboard  - Access user dashboard
```

## Database Schema

### User Model
```javascript
{
  name: String,           // User's full name
  email: String,          // Unique, validated email
  password: String,       // Hashed with bcrypt
  createdAt: Date         // Account creation timestamp
}
```

### Indexes
```javascript
email: unique           // Prevents duplicate emails
```

## Environment Variables

```
PORT=5000                           # Server port
MONGODB_URI=mongodb://...           # Database connection
JWT_SECRET=your_secret_key          # Token signing key
JWT_EXPIRE=7d                       # Token expiration time
```

## Request/Response Examples

### Register Request
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Register Response
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "id": "67214f8a3c2e1d4b5a6c7d8e",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Protected Request
```http
GET /api/user/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR...
```

### Protected Response
```json
{
  "success": true,
  "user": {
    "id": "67214f8a3c2e1d4b5a6c7d8e",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-10-29T..."
  }
}
```

## Error Handling

### Validation Errors (400)
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Please provide a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Authentication Errors (401)
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Server Errors (500)
```json
{
  "success": false,
  "message": "Server error during registration",
  "error": "Error details..."
}
```

## Middleware Chain

```
Request
  ↓
Express JSON Parser
  ↓
Route Handler (auth.js or user.js)
  ↓
[If protected route] → Auth Middleware
  ↓
Controller Logic
  ↓
Database Operations
  ↓
Response
```

## Security Best Practices Implemented

✅ Password hashing with bcrypt
✅ JWT token for stateless authentication
✅ Password not returned in responses
✅ Input validation
✅ Environment variables for secrets
✅ Error handling without exposing system details
✅ Email validation
✅ Unique email constraint
✅ Minimum password length

## Future Enhancements

- [ ] Password reset via email
- [ ] Email verification
- [ ] Refresh token mechanism
- [ ] Rate limiting
- [ ] Account lockout
- [ ] Password strength validation
- [ ] Two-factor authentication
- [ ] Session management
- [ ] User roles and permissions
- [ ] Logging and monitoring
