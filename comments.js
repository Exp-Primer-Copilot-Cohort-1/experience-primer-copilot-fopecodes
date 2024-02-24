// Create web server
// 1. npm install express
// 2. npm install body-parser
// 3. npm install mongoose
// 4. npm install nodemon --save-dev
// 5. npm install cors
// 6. npm install axios
// 7. npm install morgan

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const morgan = require('morgan');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/comments');
mongoose.Promise = global.Promise;

// Create express app
const app = express();

// Middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Import models
const Comment = require('./models/comment');

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
});

app.post('/comments', async (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        message: req.body.message,
        date: new Date()
    });
    await comment.save();
    res.send(comment);
});

app.get('/posts', async (req, res) => {
    const posts = await axios.get('http://localhost:3000/posts');
    res.send(posts.data);
});

app.listen(4000, () => {
    console.log('Listening on port 4000');
});