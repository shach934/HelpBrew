import React, { useEffect, useState } from "react";

export default function NewCommentForm({ onSubmit, post }) {
  const [email, setEmail] = useState(post.email);
  const [body, setBody] = useState("");

  // Something still happing here?
  return (
    <div>
      <label>Comment</label>
      <textarea
        placeholder="type your comment here.."
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />

      {/* <label> User </label>
            <textarea
            placeholder="type here"
            value= {authorName}
       onChange = {event => setAuthorName(event.target.value)}/>*/}

      <button
        
        onClick={() => onSubmit({ body, email, post })}
      >
        Comment
      </button>
    </div>
  );
}
