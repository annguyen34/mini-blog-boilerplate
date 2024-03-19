const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');

const commentsByPostId = {};
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/posts/:id/comments', (req, res) => {
  res.status(200).json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id, content });
  commentsByPostId[req.params.id] = comments;

  axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id,
      content,
      postId: req.params.id,
      status: 'pending',
    },
  });

  res.status(201).json(comments);
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);
  if (req.body.type === 'CommentModerated') {
    const { postId, id, status, content } = req.body.data;
    // Find comments by postId
    const comments = commentsByPostId[postId];
    // Find the comment by id
    const comment = comments.find((comment) => comment.id === id);
    // Update the status
    comment.status = status;

    axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
