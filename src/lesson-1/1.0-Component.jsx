import React from 'react';
import './1.0-Component.css';

class Demo extends React.Component {
  handleClick = () => {
    alert('这是header');
  };

  render() {
    return (
      <div id="header">
        <p onClick={this.handleClick}>这是一个header组件</p>
      </div>
    );
  }
}

// function Demo() {
//   const handleClick = () => {
//     alert('这是header');
//   };

//   return (
//     <div id="header">
//       <p onClick={handleClick}>这是一个header组件</p>
//     </div>
//   );
// }

export default Demo;
