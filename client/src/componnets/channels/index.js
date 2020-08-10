import React, { Component } from "react";

import { Redirect } from "react-router";
class Channel extends Component {
  state = { show: false, redirect: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false, redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
    return (
      <main>
        <div className='header-channel'>
          <span style={{ fontSize: "25px" }}>Channels</span>
          <button
            type='button'
            onClick={() => {
              this.props.setscope("modal");
            }}
            className='btn right'
          >
            +
          </button>
        </div>
        <hr />
        <div className='channel-list'>
          {this.props.channels.map((item) => {
            return (
              <button
                className='channel-button waves-effect'
                key={item._id}
                onClick={(e) => {
                  this.props.setscope(item._id);
                }}
              >
                {item.channelname}
              </button>
            );
          })}
        </div>
      </main>
    );
  }
}
export default Channel;
