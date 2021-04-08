import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { SET_LOADER } from "../../actions/types";
import Alert from "../layout/Alert";
import Spinner from "../layout/Spinner";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    props.dispatch({
      type: SET_LOADER,
    });
    props.dispatch(login(email, password));
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  if (props.loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Alert />
        <h1 className="large text-primary">Sign In</h1>

        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </Fragment>
    );
  }
};
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
  };
}
export default connect(mapStateToProps)(Login);
