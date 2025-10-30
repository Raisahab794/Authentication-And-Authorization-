# Quick Start Guide

## Prerequisites

Before you start, make sure you have:
- ✅ Node.js installed (v14 or higher)
- ✅ A code editor (VS Code recommended)
- ✅ Postman, Thunder Client, or curl for API testing

**Note:** No database setup required! SQLite is file-based and will be created automatically.

## Step-by-Step Setup

### 1. Install Dependencies
```powershell
npm install
```

### 2. Configure Environment Variables
The `.env` file is already created with default values. You can modify it if needed:
```
PORT=5000
JWT_SECRET=mysupersecretjwtkey123456789
JWT_EXPIRE=7d
```

**Important:** Change `JWT_SECRET` to a strong random string in production!

### 3. Start the Server
```powershell
npm start
```

Or for development with auto-reload:
```powershell
npm run dev
```

You should see:
```
Server is running on port 5000
SQLite Database Connected Successfully
Database synchronized
```

The `database.sqlite` file will be automatically created in your project root.

### 4. Test the API

Open your browser or API client and go to:
```
http://localhost:5000
```

You should see:
```json
{
  "success": true,
  "message": "Authentication API is running",
  "endpoints": {
    "register": "POST /api/auth/register",
    "login": "POST /api/auth/login",
    "profile": "GET /api/user/profile (Protected)",
    "dashboard": "GET /api/user/dashboard (Protected)"
  }
}
```

## Testing with PowerShell

### Register a User
```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "test123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

### Login
```powershell
$body = @{
    email = "test@example.com"
    password = "test123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
$token = $response.token
Write-Host "`nYour token: $token`n"
```

### Access Protected Route
```powershell
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/user/profile" -Method Get -Headers $headers
```

## Troubleshooting

### Database File
- The `database.sqlite` file is automatically created in your project root
- If you want to reset the database, simply delete this file and restart the server
- The database file is ignored by git (in `.gitignore`)

### Port Already in Use
If port 5000 is already in use, change `PORT` in `.env` file to another port (e.g., 3000, 8000)

### Module Not Found Error
Run `npm install` again to ensure all dependencies are installed

### JWT Token Invalid
- Make sure you're copying the complete token
- Check if token hasn't expired (default: 7 days)
- Ensure you're including "Bearer " before the token

## Next Steps

1. ✅ Test all endpoints using the API_TESTING.md guide
2. ✅ Try registering multiple users
3. ✅ Test invalid credentials
4. ✅ Test accessing protected routes without token
5. ✅ Modify the code to add more features

## Additional Features You Can Add

- Password reset functionality
- Email verification
- Refresh tokens
- User roles and permissions
- Rate limiting
- Account lockout after failed attempts
- Session management
- Two-factor authentication (2FA)

## Project Files Overview

- `server.js` - Main application entry point
- `config/database.js` - MongoDB connection
- `models/User.js` - User model with password hashing
- `routes/auth.js` - Registration and login routes
- `routes/user.js` - Protected user routes
- `middleware/auth.js` - JWT authentication middleware
- `.env` - Environment variables (DO NOT commit to git)
- `package.json` - Project dependencies

## Support

For issues or questions:
1. Check the README.md file
2. Review the API_TESTING.md guide
3. Check console logs for error messages
4. Ensure all prerequisites are met

Happy coding! 🚀
