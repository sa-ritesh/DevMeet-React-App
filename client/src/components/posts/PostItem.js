import { connect } from "react-redux";
import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

function PostItem(props) {
  const { auth, post } = props;
  const { _id, text, name, avatar, user, likes, comments, createdAt } = post;

  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img class="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p class="post-date">
          Posted on <Moment format="YYYY/MM//DD">{createdAt}</Moment>
        </p>
        <button type="button" class="btn btn-light">
          <i class="fas fa-thumbs-up"></i>{" "}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button type="button" class="btn btn-light">
          <i class="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} class="btn btn-primary">
          Discussion{" "}
          {comments.length > 0 && (
            <span class="comment-count">{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button type="button" class="btn btn-danger">
            <i class="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(PostItem);
