import React from 'react';

import './Caculator.scss';

const computeSign = ['+', '-', '×', '÷', '%', '='];

class Caculator extends React.Component {
  state = {
    // 本次输入
    input: '0',
    // 上一次输入
    lastInput: '0',
    // 当前运算符
    sign: '=',
    // 是否是最后输入
    isLastSignInput: false,
  };

  getResult = (num1, num2, sign) => {
    let result = 0;
    switch (sign) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '×':
        result = num1 * num2;
        break;
      case '÷':
        result = num1 / num2;
        break;
    }
    return String(result);
  };

  compute = targetSign => {
    const { lastInput, input, sign } = this.state;
    if (targetSign === '=') {
      // 计算
      if (sign !== '=') {
        const targetResult = this.getResult(
          Number(lastInput),
          Number(input),
          sign
        );
        this.setState({
          input: targetResult,
          sign: targetSign,
        });
      }
    } else if (targetSign === '%') {
      const targetResult = String(Number(input) / 100);
      this.setState({
        input: targetResult,
      });
    } else {
      this.setState({
        sign: targetSign,
        lastInput: input,
        isLastSignInput: true,
      });
    }
  };

  handleClick = e => {
    const { input, isLastSignInput } = this.state;
    const value = e.target.innerText;
    if (value === 'C') {
      this.setState({
        input: '0',
        lastInput: '0',
        sign: '=',
      });
      return;
    }
    if (computeSign.includes(value)) {
      this.compute(value);
    } else if (value === '+/-') {
      const targetResult = -Number(input);
      // 不知道这个键是干嘛的
      this.setState({
        input: targetResult,
      });
    } else if (value === '.') {
      if (input === '0' || isLastSignInput) {
        this.setState({
          input: '0.',
          isLastSignInput: false,
        });
      } else {
        if (input.indexOf('.') === -1) {
          this.setState({
            input: input + '.',
          });
        }
      }
    } else {
      let nextInput =
        input === '0' || isLastSignInput ? '' + value : input + value;
      this.setState({
        input: nextInput,
        isLastSignInput: false,
      });
    }
  };

  render() {
    const { input } = this.state;
    return (
      <div className="caculator">
        <div className="result-table">{input}</div>
        <div className="operation-table" onClick={this.handleClick}>
          <a className="block block--ctrl">C</a>
          <a className="block block--ctrl">+/-</a>
          <a className="block block--ctrl">%</a>
          <a className="block block--exp">÷</a>
          <a className="block block--num">7</a>
          <a className="block block--num">8</a>
          <a className="block block--num">9</a>
          <a className="block block--exp">×</a>
          <a className="block block--num">4</a>
          <a className="block block--num">5</a>
          <a className="block block--num">6</a>
          <a className="block block--exp">-</a>
          <a className="block block--num">1</a>
          <a className="block block--num">2</a>
          <a className="block block--num">3</a>
          <a className="block block--exp">+</a>
          <a className="block block--num block--double">0</a>
          <a className="block block--num">.</a>
          <a className="block block--exp">=</a>
        </div>
      </div>
    );
  }
}

export default Caculator;
