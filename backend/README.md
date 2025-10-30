# Backend Setup

## Prerequisites
- Node.js installed
- PostgreSQL installed and running

## Database Setup
1. Create a PostgreSQL database named `userdb`
2. Update connection details in server.js if needed

## Installation
```bash
cd backend
npm install
```

## Run
```bash
npm run dev
```

## Default Login
- Email: admin@test.com
- Password: admin123

## API Endpoints
- POST /api/login - Login user
- GET /api/users - Get all users
- POST /api/users - Add new user