import React from 'react';

class User extends React.Component {
  greeting() {
    alert('greeting');
  }

  render() {
    return 'User';
  }
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.userRef = React.createRef();
  }

  render() {
    return (
      <>
        <User ref={this.userRef} />
        <input ref={this.myRef} />
      </>
    );
  }

  componentDidMount() {
    this.myRef.current.focus();
    console.log(this.myRef);
    console.log(this.userRef);
    this.userRef.current.greeting();
  }
}

export default Demo;
