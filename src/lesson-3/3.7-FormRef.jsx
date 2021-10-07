import React from 'react';

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  handleSubmit = event => {
    console.log('提交的名字: ' + this.inputRef.current.value);
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字：
          <input type="text" ref={this.inputRef} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
