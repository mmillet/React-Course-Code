import React from 'react';

class Demo extends React.Component {
  state = {
    value: '',
  };

  render() {
    return (
      <>
        <input onChange={this.handleChange} />
        {this.state.value}
      </>
    );
  }

  handleChange = e => {
    // this.setState({
    //   value: e.target.value,
    // });
  };
}

export default Demo;
