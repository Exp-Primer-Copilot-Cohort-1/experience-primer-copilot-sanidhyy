// Create web server
// Run: node comments.js
// Load: http://localhost:3000/
// Load: http://localhost:3000/comments
// Load: http://localhost:3000/comments/1

// Load the express module
var express = require('express');

// Create an express app
var app = express();

// Create a route for the home page
app.get('/', function(req, res) {
    res.send('Welcome to the home page!');
});

// Create a route for the /comments page
app.get('/comments', function(req, res) {
    res.send('Welcome to the comments page!');
});

// Create a route for the /comments/1 page
app.get('/comments/1', function(req, res) {
    res.send('Welcome to the first comment!');
});

// Start the server
app.listen(3000, function() {
    console.log('Listening on port 3000');
});