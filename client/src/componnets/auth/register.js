import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    region: "",
    errors: "",
    redirect: false,
  };

  // function to change state when an event is happened
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // function to submit the form
  handleSubmit = (e) => {
    e.preventDefault(); // prevents default working of function
    // form the body of request
    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      region: this.state.region,
    };
    // axiosfunction to make API call
    axios
      .post(`/users`, data)
      .then((res) => {
        this.props.login("1");
      })
      .catch((err) => {
        // API call not succeed set error to display
        this.setState({ errors: "error submitting" });
      });
  };

  // check for password matching
  confirmPassword = (e) => {
    if (e.target.value !== this.state.password) {
      this.setState({
        errors: "Passwords not matching.",
      });
    } else {
      this.setState({ errors: "" });
    }
  };

  // render the jsx with proper data
  render() {
    const errors = this.state.errors;
    return (
      <div>
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <h3>Register</h3>
            <hr />
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter username'
                id='username'
                onChange={this.handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                placeholder='Enter email'
                id='email'
                onChange={this.handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Enter password'
                id='password'
                onChange={this.handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Confirm password'
                id='confirm_password'
                onChange={this.confirmPassword}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter Region'
                id='region'
                onChange={this.handleChange}
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
            {errors ? (
              <center>
                <span className='error'>{errors}</span>
              </center>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
