import React from 'react';
import axios from 'axios';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  getUser = async () => {
    const res = await axios.get(
      `https://xiaozhu.run/api/user/${this.props.id}`
    );
    this.setState({
      username: res.data.data.username,
    });
  };

  componentDidMount() {
    // 可以做1：获取 dom
    // console.log(this.myRef.current);
    // 可以做2：ajax
    this.getUser();
  }

  componentDidUpdate(prevProps) {
    // 🤔 当id变化时，重新请求用户信息
    console.log(prevProps);
    if (prevProps.id !== this.props.id) {
      this.getUser();
    }
  }

  render() {
    return (
      <p>
        {this.props.id} Username: {this.state.username}
      </p>
    );
  }
}

class Demo extends React.Component {
  state = {
    id: 9527,
  };

  onChangeUser = () => {
    this.setState({ id: this.state.id + 1 });
  };

  render() {
    return (
      <>
        <button onClick={this.onChangeUser}>Change User {this.state.id}</button>
        <Component id={this.state.id} />
      </>
    );
  }
}

export default Demo;
