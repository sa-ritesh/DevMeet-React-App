import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "../../store";
import { getCurrentProfile } from "../../actions/profile";

const Dashboard = (props) => {
  useEffect(() => {
    store.dispatch(getCurrentProfile());
  }, []);
  return <div>Dashboard</div>;
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    profile: state.profile,
  };
}
export default connect(mapStateToProps)(Dashboard);
