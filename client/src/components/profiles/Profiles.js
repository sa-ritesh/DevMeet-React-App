import { connect } from "react-redux";
import React, { Fragment, useEffect } from "react";
import { getProfiles } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";

function Profiles(props) {
  useEffect(() => {
    props.dispatch(getProfiles());
  }, []);
  return (
    <Fragment>
      {props.profile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop">
              &nbsp; Browse and connect with developers
            </i>
          </p>
          <div className="profiles">
            {props.profile.profiles.length > 0 ? (
              props.profile.profiles.map((profile) => {
                return <ProfileItem key={profile._id} profile={profile} />;
              })
            ) : (
              <h4>No Profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(Profiles);
