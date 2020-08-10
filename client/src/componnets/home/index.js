import React, { Component } from "react";
import cookie from "js-cookie";
import { Redirect } from "react-router";
import Axios from "axios";
import Channel from "../channels";
import Message from "../messages";
import Nav from "./nav";

class Home extends Component {
  state = {
    redirect: false,
    users: [],
    channels: [],
    scope: "",
    load: false,
  };

  setScope = (scop) => {
    this.setState({
      scope: scop,
      load: true,
    });
  };

  componentDidMount() {
    const token = cookie.get("token");
    Axios.get("/users", {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then((res) => {
        this.setState({
          users: res.data,
        });
        Axios.get("/channel", {
          headers: {
            Authorization: `Basic ${token}`,
          },
        })
          .then((res) => {
            this.setState({
              channels: res.data,
              load: true,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
    if (!this.state.load) {
      return <center>loading...</center>;
    }
    return (
      <div className='home'>
        <Nav />
        <div className='row nonav'>
          <div className='col s3'>
            <Channel channels={this.state.channels} setscope={this.setScope} />
          </div>
          <div className='col s9'>
            <div>
              <Message scope={this.state.scope} users={this.state.users} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
