import React from 'react';
import axios from 'axios';

import NOW_SHOW_USER_ID from '../constant';

console.log(`NOW_SHOW_USER_ID`, NOW_SHOW_USER_ID);

import './3.3-ComponentDidMoun.css';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
    };
  }

  getUserPromise = idList => {
    return idList.map(id => {
      return axios.get(`https://xiaozhu.run/api/user/${id}`);
    });
  };

  async componentDidMount() {
    const resList = await Promise.all([
      axios.get(`https://xiaozhu.run/api/user/${NOW_SHOW_USER_ID}`),
      ...this.getUserPromise([9527, 9528, 9529]),
    ]);

    // console.log('ID 1', res);
    console.log(`resList`, resList);
    const userList = resList.map(item => {
      return item.data.data;
    });
    console.log(`userList`, userList);
    this.setState({ userList });
  }

  render() {
    return (
      <div className="user-list">
        {this.state.userList.map((item, index) => {
          if (item.id === NOW_SHOW_USER_ID) {
            return null;
          }
          return (
            <React.Fragment key={item.id}>
              <p>ID: {item.id}</p>
              <p>Username: {item.username}</p>
              <p>Email: {item.email}</p>
              <hr />
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

export default Demo;
