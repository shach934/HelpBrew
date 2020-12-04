import React, { useEffect, useState } from "react";
import Api from "../../../api/Api";
import { useNotification } from "../../notifications/NotificationProvider";

export default function NewCommentForm({ onSubmit, post }) {
  const [authorName, setAuthorName] = useState("");
  const [body, setBody] = useState("");


  //Notification Creator 
  const dispatch = useNotification();
  const handlePostNotification = () => {
    dispatch({
      type: "SUCCESS",
      message: "Posting your comment!",
    });
  };

  useEffect(() => {
    Api.get("/user/").then((response) => {
      const email = response.data;
      setAuthorName(email);
    });
  }, []);

  // Something still happing here?
  return (
    <div className="comment-area">

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

      <button onClick={() => {
        onSubmit({ body, authorName, post });
        handlePostNotification();
      }}>
        Comment
      </button>
    </div>
  );
}
