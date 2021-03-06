import { connect } from "react-redux";
import React, { Fragment, useEffect } from "react";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import Alert from "../layout/Alert";
import PostForm from "./PostForm";

function Posts(props) {
  const { post } = props;
  const { posts, loading } = post;
  useEffect(() => {
    props.dispatch(getPosts());
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Alert />
      {console.log("Render")}
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community
      </p>
      <PostForm />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
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
export default connect(mapStateToProps)(Posts);
