import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

function CommentFrom({ postId, addComment }) {
  const [text, setText] = useState("");
  return (
    <div className="post-form">
      <div className="bg-primary p">Leave a Comment </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a Comment"
          onChange={(e) => setText(e.target.value)}
          value={text}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
}

export default connect(null, { addComment })(CommentFrom);
