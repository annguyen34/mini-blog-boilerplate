import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

function App() {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />
      <h1 className="mt-10">Posts</h1>
      <PostList />
    </div>
  );
}

export default App;
