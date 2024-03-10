import { React } from 'react';

function CommentList({ comments }) {
  return (
    <div>
      {comments &&
        Object.values(comments).map((comment) => (
          <div key={comment.id}>{comment.content}</div>
        ))}
    </div>
  );
}

export default CommentList;
