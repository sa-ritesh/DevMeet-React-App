import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const Landing = (props) => {
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Talk</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Fragment>
              <Link to="register" className="btn btn-primary">
                Sign Up
              </Link>
              <Link to="login" className="btn btn-light">
                Login
              </Link>
            </Fragment>
          </div>
        </div>
      </div>
    </section>
  );
};
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}
export default connect(mapStateToProps)(Landing);
