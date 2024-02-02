const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
require("dotenv").config();
const SecretKey = process.env.jwtSecret;

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Define your JWT secret key (replace with a secure key)


// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ errorMessage: 'Unauthorized: Token missing' });
  }

  jwt.verify(token, SecretKey, (err, user) => {
    if (err) {
      return res.status(401).json({ errorMessage: 'Unauthorized: Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ errorMessage: 'Internal Server Error' });
};

// Authentication Endpoint
// app.post('/getToken', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Load user data from the 'data' folder
//     const userData = await fs.readFile(path.join(__dirname, 'data', 'users.json'), 'utf8');
//     const users = JSON.parse(userData);

//     const user = users.find(u => u.username === username && u.password === password);

//     if (user) {
//       const token = jwt.sign({ username: user.username }, jwtSecret);
//       res.json({ token });
//     } else {
//       res.status(401).json({ errorMessage: 'Authentication failed' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ errorMessage: 'Internal Server Error' });
//   }
// });

app.post('/getToken', async (req, res) => {
  const { username, password } = req.body;

  try {
    const filePath = path.join(__dirname, 'data', 'users.json');
    console.log('File path:', filePath);

    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    const users = data.users;

    console.log('Received credentials:', { username, password });
    console.log('Users from file:', users);

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      const token = jwt.sign({ username: user.username }, SecretKey);
      fs.writeFile('./jwt.env', () => {});
      res.json({ token });
    } else {
      res.status(401).json({ errorMessage: 'Authentication failed: Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: `Internal Server Error: Unable to read user data - ${error.message}` });
  }
});





// Example HTML form to submit credentials
app.get('/', (req, res) => {
  res.send(`
  <form action="/getToken" method="post">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required><br>

    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required><br>

    <button type="submit">Login</button>
  </form>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
