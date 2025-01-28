// filepath: index.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const users = []; // This will act as our in-memory database

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send('User registered');
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username: user.username }, 'secretkey');
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Protected route
app.get('/protected', (req, res) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, 'secretkey', (err, decoded) => {
            if (err) {
                return res.status(401).send('Invalid token');
            } else {
                res.send('This is a protected route');
            }
        });
    } else {
        res.status(401).send('No token provided');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});