import React from 'react';
import axios from 'axios';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  componentDidMount() {
    // 可以做1：获取 dom
    // console.log(this.myRef.current);
    // 可以做2：ajax
    axios.get('https://xiaozhu.run/api/user/9527').then(res => {
      this.setState({
        username: res.data.data.username,
      });
    });
  }

  render() {
    return <p>Username: {this.state.username}</p>;
  }
}

export default Demo;
