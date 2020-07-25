import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  loading,
  user,
  ...rest
}) => {
  return (
    <Fragment>
      <Route
        {...rest}
        render={(props) =>
          !isAuthenticated && !loading ? (
            <Redirect to="/auth-denied" />
          ) : (
            <Component {...props} />
          )
        }
      />
    </Fragment>
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(PrivateRoute);
