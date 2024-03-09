import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function PostCreate() {
  const [title, setTitle] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post('http://localhost:4000/posts', {
      title,
    });

    setTitle('');
  };
  return (
    <div>
      <form className="form-group" onSubmit={onSubmit}>
        <h4>Title</h4>
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
}

export default PostCreate;
