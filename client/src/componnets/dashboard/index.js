import React, { Component } from "react";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Nav from "../home/nav";

class Dashboard extends Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
    topChannels: [],
    topRegion: [],
    topTags: [],
    topUser: [],
  };

  fetchData = () => {
    let data = {
      d1: this.state.startDate,
      d2: this.state.endDate,
    };
    if (data.d1.toString() === data.d2.toString()) {
      data.d1 = new Date(Date.parse("2020-01-01T00:00:00.000Z"));
    }
    Axios.post("/metrics", data)
      .then((res) => {
        this.setState({
          topChannels: res.data.topChannels,
          topRegion: res.data.topRegion,
          topTags: res.data.topTags,
          topUser: res.data.topUser,
          load: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleStart = (date) => {
    this.setState({ startDate: date });
  };
  handleEnd = (date) => {
    this.setState({ endDate: date });
  };

  componentWillMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <Nav />
        <center>
          <div className='date'>
            <span className='d'>
              Start Date: &nbsp;&nbsp;&nbsp;
              <DatePicker
                selected={this.state.startDate}
                onSelect={this.handleStart}
              />
            </span>
          </div>
          <div className='date'>
            <span className='d'>
              End Date: &nbsp;&nbsp;&nbsp;
              <DatePicker
                selected={this.state.endDate}
                onSelect={this.handleEnd}
              />
            </span>
          </div>
          <a href="/#" className='waves-effect waves-light btn' onClick={this.fetchData}>
            Update
          </a>
        </center>
        <hr />
        <div>
          <center>
            <div className='row'>
              <div className='col s3'>
                Top Channels
                <hr />
                <div className='row'>
                  <div className='col s8'>Channel Name</div>
                  <div className='col s4'>Post Count</div>
                </div>
                <hr />
                {this.state.topChannels.map((item, index) => {
                  return (
                    <div className='row' key={index}>
                      <div className='col s8'>{item.channelname}</div>
                      <div className='col s4'>{item.count}</div>
                    </div>
                  );
                })}
              </div>
              <div className='col s3'>
                Top Users
                <hr />
                <div className='row'>
                  <div className='col s8'>User Name</div>
                  <div className='col s4'>Post Count</div>
                </div>
                <hr />
                {this.state.topUser.map((item, index) => {
                  return (
                    <div className='row' key={index}>
                      <div className='col s8'>{item.username}</div>
                      <div className='col s4'>{item.count}</div>
                    </div>
                  );
                })}
              </div>
              <div className='col s3'>
                Top Tags
                <hr />
                <div className='row'>
                  <div className='col s8'>Tag Name</div>
                  <div className='col s4'>Channel Count</div>
                </div>
                <hr />
                {this.state.topTags.map((item, index) => {
                  return (
                    <div className='row' key={index}>
                      <div className='col s8'>{item.tag}</div>
                      <div className='col s4'>{item.count}</div>
                    </div>
                  );
                })}
              </div>
              <div className='col s3'>
                Top Regions
                <hr />
                <div className='row'>
                  <div className='col s8'>Region Name</div>
                  <div className='col s4'>User Count</div>
                </div>
                <hr />
                {this.state.topRegion.map((item, index) => {
                  return (
                    <div className='row' key={index}>
                      <div className='col s8'>{item.region}</div>
                      <div className='col s4'>{item.count}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </center>
        </div>
      </div>
    );
  }
}

export default Dashboard;
