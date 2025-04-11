# FAU Graduate Teaching Assistant Management System
- JamesJ
A robust system designed to streamline the management of graduate teaching assistants, providing tools for efficient application reviews, recommendations, and approvals.

## Features
- Manage TA applications effectively.
- Role-based functionality for instructors, administrators, and applicants.
- Secure handling of sensitive data with support for encrypted secrets.

---

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- MySQL

  
### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ta-management-system.git
   cd ta-management-system
   ```
   Install npm for both frontend and backend
   ```
   cd frontend && npm i
   cp .env.example .env

   cd ../backend && npm i
   cp .env.example .env
   ```
   
### Backend
Start the backend server:
```
node server.js
```

### Frontend
Start the frontend application:

```
npm run start
```

### Database
Build databse from ta.sql in backend/config/ta.sql
Seed database with sample data from backend/seeder/seeder_12-07-2024.sql

Configure backend/config/refresh.sql to easily rebuild and reseed db

### Author
Jyothsna Nagella - 2024
Test CI/CD trigger at Wed Apr  9 12:08:21 PM UTC 2025
Triggered with Compose v2 🐳
Triggering with system-wide Compose fix
