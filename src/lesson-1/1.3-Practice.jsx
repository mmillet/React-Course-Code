import React from 'react';
import './1.3-Practice.css';

class Base extends React.Component {
  componentWillUnmount() {
    console.log(123);
  }
}

class Demo extends Base {
  constructor(props) {
    super(props);
  }

  static b = 456;

  a = 777;

  componentWillUnmount() {
    console.log('000');
  }

  onClick = () => {
    console.log(this);
    alert('click');
  };

  render() {
    const props = {
      style: { color: 'red' },
      id: 'yyy',
      onClick: () => alert('333'),
    };
    const props2 = {
      ...props,
      style: { color: 'green' },
    };
    return (
      <div {...props2} onClick={this.onClick}>
        yyyy
      </div>
    );
  }
}

Demo.u = 666;

console.log(Demo.b);

export default Demo;
