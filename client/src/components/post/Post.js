import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

function Post(props) {
  const { post, loading } = props.post;
  useEffect(() => {
    props.dispatch(getPost(props.match.params.postId));
  }, [getPost]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
}
function mapStateToProps(state) {
  return {
    post: state.post,
  };
}
export default connect(mapStateToProps)(Post);
