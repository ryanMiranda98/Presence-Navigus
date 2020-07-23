import React, { useState } from "react";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Signin = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      console.log("Empty fields");
    }
    login(formData);
    setFormData({
      email: "",
      password: "",
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="container">
      <form className="signin-form" onSubmit={onSubmit}>
        <h1 className="text-center">SIGN IN</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="email"
            onChange={handleChange}
            value={email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            value={password}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
    </div>
  );
};

Signin.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Signin);
