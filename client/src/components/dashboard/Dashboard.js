import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import store from "../../store";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Alert from "../layout/Alert";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = (props) => {
  useEffect(() => {
    store.dispatch(getCurrentProfile());
  }, []);

  return props.auth.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Alert />
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" />
        &nbsp; Welcome {props.auth.user && props.auth.user.name}
      </p>
      {props.profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience />
          <Education />
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => {
                props.dispatch(deleteAccount());
              }}
            >
              <i className="fas fa-user-minus"></i> Delete Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet SetUp a profile, Please Add Some Info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => {
                props.dispatch(deleteAccount());
              }}
            >
              <i className="fas fa-user-minus"></i> Delete Account
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    profile: state.profile.profile,
  };
}
export default connect(mapStateToProps)(Dashboard);
