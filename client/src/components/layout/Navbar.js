import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

const Navbar = ({ isAuthenticated, user, loading, logout }) => {
  const guestLinks = (
    <Fragment>
      <Link className="nav-item nav-link" to="/">
        Sign Up
      </Link>
      <Link className="nav-item nav-link" to="/signin">
        Sign In
      </Link>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <span id="welcome-user" className="nav-item nav-link">
        {!user ? "" : <span>Welcome, {user.name.split(" ")[0]}</span>}
      </span>
      <Link className="nav-item nav-link active" to="/home">
        Home
      </Link>
      <Link to="/signin" className="nav-item nav-link" onClick={() => logout()}>
        Logout
      </Link>
    </Fragment>
  );

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to={isAuthenticated ? "/home" : "/"}>
          Presence
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            {!loading && (
              <Fragment>
                {!isAuthenticated && !loading ? guestLinks : authLinks}
              </Fragment>
            )}
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout })(Navbar);
