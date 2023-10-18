// create web server
const express = require('express');
const app = express();
const port = 3000;
// import data
const { comments } = require('./data/comments');
// import functions
const { findById, findByMovieId, createNewComment } = require('./utils/comments');

// middleware
app.use(express.json());

// GET /comments - returns all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// GET /comments/:id - returns a single comment by id
app.get('/comments/:id', (req, res) => {
  const comment = findById(comments, req.params.id);
  if (!comment) {
    res.status(404).json({ msg: `Comment with id ${req.params.id} not found.` });
    return;
  }
  res.json(comment);
});

// GET /comments/movie/:movieId - returns all comments for a movie by movie id
app.get('/comments/movie/:movieId', (req, res) => {
  const movieComments = findByMovieId(comments, req.params.movieId);
  if (!movieComments) {
    res.status(404).json({ msg: `No comments for movie with id ${req.params.movieId} found.` });
    return;
  }
  res.json(movieComments);
});

// POST /comments - creates a new comment
app.post('/comments', (req, res) => {
  const { commenter, movieId, comment } = req.body;
  if (!commenter || !movieId || !comment) {
    res.status(400).json({ msg: 'Please include a commenter, movieId, and comment.' });
    return;
  }
  const newComment = createNewComment(comments, commenter, movieId, comment);
  res.json(newComment);
});

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});