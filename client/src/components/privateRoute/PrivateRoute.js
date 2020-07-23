import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  loading,
  ...rest
}) => {
  return (
    <Fragment>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated && !loading ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(PrivateRoute);
