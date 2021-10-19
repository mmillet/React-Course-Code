import React from 'react';

// class Demo extends React.Component {
//   render() {
//     return (
//       <div>
//         <div>header</div>
//         <div>content</div>
//       </div>
//     );
//   }
// }

// 错误示例
// class Demo extends React.Component {
//   render() {
//     return (
//       <div>header</div>
//       <div>content</div>
//     );
//   }
// }

// class Demo extends React.Component {
//   render() {
//     return (
//       <>
//         <div>header</div>
//         <div>content</div>
//       </>
//     );
//   }
// }

class Content extends React.Component {
  render() {
    return 'content';
  }
}

class Demo extends React.Component {
  render() {
    return [<div key="1">header</div>, <Content key="content" />];
  }
}

export default Demo;
