import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import "./forms.css";
import { Redirect } from "react-router-dom";

const Signup = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { name, email, password, passwordConfirm } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm === ""
    ) {
      console.log("Empty fields");
    }
    if (password !== passwordConfirm) {
      console.log("Passwords do not match");
    }
    register(formData);
    setFormData({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="container">
      <form className="signup-form" onSubmit={onSubmit}>
        <h1 className="text-center">SIGN UP</h1>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="name"
            value={name}
            onChange={(e) => handleChange(e)}
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="passwordConfirm">Re-enter Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordConfirm"
            name="passwordConfirm"
            onChange={handleChange}
            value={passwordConfirm}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
      </form>
    </div>
  );
};

Signup.propTypes = {
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Signup);
