import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <div>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        {Object.values(posts).map((post) => (
          <div
            key={post.id}
            className="card"
            style={{ width: '30%', marginBottom: '20px' }}
          >
            <div className="card-body">
              <h3>{post.title}</h3>
            </div>

            <CommentList postId={post.id} />

            <CommentCreate postId={post.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;