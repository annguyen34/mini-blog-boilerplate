import { React } from 'react';

function CommentList({ comments }) {
  return (
    <div>
      {comments &&
        Object.values(comments).map((comment) => {
          let content;
          if (comment.status === 'approved') {
            content = comment.content;
          }
          if (comment.status === 'pending') {
            content = 'This comment is awaiting moderation';
          }
          if (comment.status === 'rejected') {
            content = 'This comment has been rejected';
          }
          return <li key={comment.id}> {content}</li>;
        })}
    </div>
  );
}

export default CommentList;
