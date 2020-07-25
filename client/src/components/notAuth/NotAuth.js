import React from "react";
import { Link } from "react-router-dom";

const NotAuth = () => {
  return (
    <div className="container text-center">
      <h1>You are not authorized to access this page.</h1>
      <h4>Please sign in to get access</h4>
      <Link to="/signin">
        <button
          className="btn btn-lg btn-primary"
          style={{ marginTop: "30px" }}
        >
          Sign In
        </button>
      </Link>
    </div>
  );
};

export default NotAuth;
