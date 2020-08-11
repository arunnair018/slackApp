import React, { Component } from "react";
import Axios from "axios";
import cookie from "js-cookie";
import Modal from "../channels/createModal";

class Message extends Component {
  state = {
    message: [],
    load: false,
    currmsg: "",
  };

  fetchData = () => {
    if (this.props.scope === "modal") {
      this.setState({
        load: true,
      });
    } else {
      let token = cookie.get("token");
      Axios.get(`/message/${this.props.scope}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
        .then((res) => {
          this.setState({
            message: res.data.reverse(),
            load: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  showModal() {
    this.setState({ load: true });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.scope !== prevProps.scope) {
      this.fetchData();
    }
  }

  handleChange = (e) => {
    this.setState({
      currmsg: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let token = cookie.get("token");
    let channel = this.props.scope;
    let data = {
      username: cookie.get("username"),
      channel: channel,
      message: this.state.currmsg,
    };
    this.setState({
      message: [data, ...this.state.message],
      currmsg: "",
    });
    Axios.post("/message", data, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then((res) => {
        this.setState({ load: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (!this.state.load) {
      return <center>"Select a channel to display messages"</center>;
    }
    if (this.props.scope === "modal") {
      return <Modal users={this.props.users} />;
    }
    return (
      <div className='row'>
        <form className='col s12' onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className='input-field col s10'>
              <input
                placeholder='Message'
                type='text'
                onChange={this.handleChange}
                value={this.state.currmsg}
              />
            </div>
            <div className='input-field col s2'>
              <button type='submit' className='waves-effect waves-light btn'>
                Send
              </button>
            </div>
          </div>
        </form>
        <div className='row msg'>
          {this.state.message.map((item, index) => {
            let border =
              cookie.get("username") === item.username
                ? "border-green"
                : "border-red";
            let float =
              cookie.get("username") === item.username ? "right" : "left";
            return (
              <div class='col s12'>
                <p
                  className={`waves-effect waves-teal btn-flat ${border}`}
                  key={index}
                >
                  <span className={`messenger ${float}`}>{item.username}</span>
                  <span>{item.message}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Message;
