import React, { useState, Component } from "react";
import cookie from "js-cookie";
import Axios from "axios";

class Nav extends Component {
  state = {
    search: "",
    modal: "",
    data: [],
  };

  closeModal = () => {
    this.setState({
      modal: "",
    });
  };

  openModal = () => {
    this.setState({
      modal: "open-modal",
    });
  };

  logout = () => {
    cookie.remove("token");
    cookie.remove("username");
    cookie.remove("region");
  };

  searchpost = () => {
    let data = { query: this.state.search };
    Axios.post("/search", data)
      .then((res) => {
        this.setState({
          data: res.data,
        });
        this.openModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <div className='nav-fixed'>
          <nav>
            <div className='nav-wrapper'>
              <a href='/' className='brand-logo'>
                Messenger
              </a>
              <ul id='nav-mobile' className='right logout'>
                <li>
                  <form>
                    <div className='row search-row'>
                      <div className='input-field col s8'>
                        <input
                          placeholder='Enter Keyword to search post'
                          id='first_name'
                          type='text'
                          className='validate search'
                          onChange={(e) =>
                            this.setState({ search: e.target.value })
                          }
                        />
                      </div>
                      <div className='input-field col s4'>
                        <a className='btn' onClick={this.searchpost}>
                          Search
                        </a>
                      </div>
                    </div>
                  </form>
                </li>
                <li>
                  <a href='/'>Home</a>
                </li>
                <li>
                  <a href='/dashboard'>Dashboard</a>
                </li>
                <li>
                  <a href='#' onClick={this.logout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div>
          <div id='myModal' class={`modal ${this.state.modal}`}>
            <div className='modal-content'>
              <span className='close' onClick={this.closeModal}>
                &times;
              </span>
              <div>
                {this.state.data.map((item, index) => {
                  return (
                    <div class='searches' key={index}>
                      <p>{item.username}</p>
                      <p>{item.message}</p>
                      <hr />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
