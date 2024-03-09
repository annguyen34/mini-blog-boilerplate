const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.post('/posts', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments = post.comments || [];
    post.comments.push({ id, content });
  }

  console.log(data);
  res.send({});
});

app.get('/events', (req, res) => {
  res.send(posts);
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
