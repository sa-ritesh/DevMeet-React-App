import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../../actions/post";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";

function Post(props) {
  const { post, loading } = props.post;
  useEffect(() => {
    props.dispatch(getPost(props.match.params.postId));
  }, [getPost]);
  return loading || post === null ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments"></div>
    </Fragment>
  );
}
function mapStateToProps(state) {
  return {
    post: state.post,
  };
}
export default connect(mapStateToProps)(Post);
