import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Alert = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => {
      return (
        <div className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
      );
    })
  );
};

Alert.prototype = {
  alerts: PropTypes.array.isRequired,
};
function mapStateToProps({ alert }) {
  return {
    alerts: alert,
  };
}

export default connect(mapStateToProps)(Alert);
