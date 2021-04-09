import { connect } from "react-redux";
import React, { Fragment } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { addLike, deletPost, removeLike } from "../../actions/post";

function PostItem(props) {
  const { auth, post, showActions = true } = props;
  const { _id, text, name, avatar, user, likes, comments, createdAt } = post;

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM//DD">{createdAt}</Moment>
        </p>
        {showActions && (
          <Fragment>
            {" "}
            <button
              type="button"
              className="btn btn-light"
              onClick={(e) => props.dispatch(addLike(_id))}
            >
              <i className="fas fa-thumbs-up"></i>{" "}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={(e) => props.dispatch(removeLike(_id))}
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) => props.dispatch(deletPost(_id))}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    posts: state.post.posts,
  };
}
export default connect(mapStateToProps)(PostItem);
