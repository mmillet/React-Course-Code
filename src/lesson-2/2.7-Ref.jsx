import React from 'react';

class Demo extends React.Component {
  render() {
    return (
      <input
        ref={ele => {
          this.myRef = ele;
        }}
      />
    );
  }

  componentDidMount() {
    this.myRef.focus();
  }
}

// class Demo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.myRef = React.createRef();
//   }

//   render() {
//     return <input ref={this.myRef} />;
//   }

//   componentDidMount() {
//     this.myRef.current.focus();
//   }
// }

export default Demo;
