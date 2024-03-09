const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const commentsByPostId = {};
const app = express();
app.use(bodyParser.json());

app.get('/posts/:id/comments', (req, res) => {
  res.status(200).json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id, content });
  commentsByPostId[req.params.id] = comments;

  res.status(201).json(comments);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});