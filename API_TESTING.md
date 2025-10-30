# API Testing Guide

## Using Thunder Client (VS Code Extension)

1. Install Thunder Client extension in VS Code
2. Create a new collection for "Authentication API"
3. Test the endpoints below

## Using Postman

Import these requests or create them manually:

### 1. Register User

**Method:** POST
**URL:** `http://localhost:5000/api/auth/register`
**Headers:**
```
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

### 2. Login User

**Method:** POST
**URL:** `http://localhost:5000/api/auth/login`
**Headers:**
```
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Note:** Copy the `token` from the response for the next requests.

---

### 3. Get User Profile (Protected)

**Method:** GET
**URL:** `http://localhost:5000/api/user/profile`
**Headers:**
```
Authorization: Bearer <paste_your_token_here>
```

---

### 4. Get User Dashboard (Protected)

**Method:** GET
**URL:** `http://localhost:5000/api/user/dashboard`
**Headers:**
```
Authorization: Bearer <paste_your_token_here>
```

---

## Using PowerShell (Windows)

### Register:
```powershell
$body = @{
    name = "John Doe"
    email = "john@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

### Login:
```powershell
$body = @{
    email = "john@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
$token = $response.token
Write-Host "Token: $token"
```

### Get Profile:
```powershell
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/user/profile" -Method Get -Headers $headers
```

### Get Dashboard:
```powershell
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/user/dashboard" -Method Get -Headers $headers
```

---

## Expected Responses

### Successful Registration (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "67214f8a3c2e1d4b5a6c7d8e",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Successful Login (200):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "67214f8a3c2e1d4b5a6c7d8e",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Error - Invalid Credentials (401):
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Error - User Already Exists (400):
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

### Error - Unauthorized Access (401):
```json
{
  "success": false,
  "message": "Not authorized to access this route. Please login."
}
```

---

## Testing Flow

1. **Register** a new user → Get token
2. **Login** with same credentials → Get token
3. Use the token to access **Profile**
4. Use the token to access **Dashboard**
5. Try accessing protected routes without token → Should get 401 error
6. Try login with wrong password → Should get 401 error
