import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";

class Login extends Component {
  state = {
    email: "",
    password: "",
    region: "",
    errors: {},
    redirect: false,
  };

  // function to change state when an event is happened
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
      region: this.state.region.toLocaleLowerCase(),
    };
    // axiosfunction to make API call
    axios
      .post(`/login`, data)
      .then((res) => {
        // when API call succeed set cookies
        cookie.set("token", res.data.token);
        cookie.set("region", res.data.region);
        cookie.set("username", res.data.username);
        cookie.set("id", res.data._id);
        this.setState({ redirect: true });
      })
      .catch((res) => {
        // API call not succeed set error to display
        if (!res.response) {
          this.setState({
            errors: {
              error: "Network Error",
            },
          });
        } else {
          this.setState({ errors: res.response.data });
        }
        console.log(this.state);
      });
  };

  render() {
    const errors = this.state.errors;
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to='/home' />;
    }
    return (
      <div>
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <h3>Log In</h3>
            <hr />
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                placeholder='Enter email'
                id='email'
                onChange={this.handleChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Enter password'
                id='password'
                onChange={this.handleChange}
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
            <center>
              {errors ? (
                <span className='error red-text text-darken-2'>
                  {errors.error}
                </span>
              ) : (
                ""
              )}
            </center>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
