import React, { Component } from "react";
import cookie from "js-cookie";
import Axios from "axios";
import { Redirect } from "react-router";

class Modal extends Component {
  state = {
    name: "",
    description: "",
    tags: "",
    invites: [cookie.get("id")],
    users: this.props.user,
    names: [],
    redirect: false,
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      description: this.state.description,
      tags: this.state.tags.split(" "),
      invites: this.state.invites,
    };
    const token = cookie.get("token");
    Axios.post("/channel", data, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then((res) => {
        this.setState({ redirect: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addInvites = (e) => {
    e.preventDefault();
    let id = e.target.id;
    let name = e.target.innerHTML;
    this.setState({
      invites: [...this.state.invites, id],
      names: [...this.state.names, name],
    });
  };

  render() {
    const users = this.props.users;

    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
    return (
      <div className='container'>
        <h3>Create a new channel</h3>
        <section className='modal-main'>
          <div className=' modainer'>
            <div className='row'>
              <form className='col- 12'>
                <div className='input-field col s6'>
                  <input
                    placeholder='Channel Name'
                    id='name'
                    type='text'
                    className='validate'
                    onChange={this.handleChange}
                  />
                </div>
                <div className='input-field col s6'>
                  <input
                    placeholder='tags (seperate by space)'
                    id='tags'
                    type='text'
                    className='validate'
                    onChange={this.handleChange}
                  />
                </div>
                <div className='input-field col s12'>
                  <input
                    placeholder='Description'
                    id='description'
                    type='text'
                    className='validate'
                    onChange={this.handleChange}
                  />
                </div>

                <div className='input-field col s12'>
                  <input
                    placeholder='invites'
                    id='invites'
                    type='text'
                    className='validate'
                    onChange={this.handleChange}
                    value={this.state.names}
                    disabled
                  />
                </div>
                <div class='invites-list'>
                  {users.map((item) => {
                    if (item.username === cookie.get("username")) {
                      return "";
                    }
                    return (
                      <button
                        onClick={this.addInvites}
                        id={item._id}
                        key={item._id}
                        value={item}
                        className='invites'
                      >
                        {item.username}
                      </button>
                    );
                  })}
                </div>
              </form>
            </div>
            <button
              className='btn waves-effect waves-light right'
              type='submit'
              name='action'
              onClick={this.handleSubmit}
            >
              CREATE
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default Modal;
