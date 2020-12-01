import React, { useState, useEffect } from "react";
import Api from "../../../api/Api";
import { Link } from "react-router-dom";

//PostCard displays a post in a listing of posts on PostsPage.

//The code below should be worked through. What information should be displayed on
//PostCard? Shall tags "Available"/"Claimed" stay as they are or are we changing that?
function PostCard({ post }) {
  const [like, setLike] = useState(0); 
  const [dislike, setDislike] = useState(0);

  useEffect(() => {
    Api.get("/reactions/post/" + post.id + "?type=like")
    .then(response => setLike(response.data))
    .catch(er => console.log(er));;
  },[like, post.id]);

  useEffect(() => {
    Api.get("/reactions/post/" + post.id + "?type=dislike")
    .then(response => setDislike(response.data))
    .catch(er => console.log(er));;
  },[dislike, post.id]);
  

  const onLikeClicked = () => {
    Api.put("/reactions/post/" + post.id, "like");
  }

  const onDisLikeClicked = () => {
    Api.put("/reactions/post/" + post.id, "dislike");
  }

  return (
    <div>
      <div>
        <div>
          <a href={post.imageUrl}>
            <img
              style={{ width: "100px" }}
              className={post.claimed ? "claimed pic-1" : "pic-1"}
              src={post.imageUrl}
              alt=""
            />
          </a>
          {post.claimed ? <span>Claimed</span> : <span>Available</span>}
        </div>
        <div>
          <h3>
            <a href={post.title}>{post.title}</a>
          </h3>
          <div>
            <span>{post.date}</span>
            <br />
          </div>

          {/* Once View Post button is clicked by user, user is redirected to 
          the SinglePost page where all the details about the post are specified.
          */}
          <Link
            className="claim"
            to={{ pathname: `/posts/${post.id}`, state: { post } }}
          >
            View Post
          </Link>
          <div className="reaction">
            <button onClick={onLikeClicked}>
              <i className="fas fa-thumbs-up"></i> {like}
            </button>
            <button onClick={onDisLikeClicked}>
              <i className="fas fa-thumbs-down"></i> {dislike}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
