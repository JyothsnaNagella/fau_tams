const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MySQL Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Import route files
const applicantRoute = require('./routes/applicant');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const protectedRoute = require('./routes/protectedroute');
const committeeRoute = require('./routes/committee');
const instructorRoute = require('./routes/instructor');
const staffRoute = require('./routes/staff');

// Use routes
app.use('/applicant', applicantRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/api/protected', protectedRoute);
app.use('/committee', committeeRoute);
app.use('/instructor', instructorRoute);
app.use('/staff', staffRoute);

// Add a simple "hello world" route
app.get('/hello', (req, res) => {
  res.send('hello world');
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
