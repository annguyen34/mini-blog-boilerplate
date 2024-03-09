import { React, useState, useEffect } from 'react';
import axios from 'axios';

function CommentList({ postId }) {
  const [comments, setComments] = useState({});

  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      {Object.values(comments).map((comment) => (
        <div key={comment.id}>{comment.content}</div>
      ))}
    </div>
  );
}

export default CommentList;
