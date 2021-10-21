import React from 'react';
import './Caculator.scss';

const STEP = {
  NUMBER_1: 1,
  NUMBER_2: 2,
};

const BTN_TYPE = {
  CTRL: 'ctrl',
  EXP: 'exp',
  NUMBER: 'num',
};

const CTRL = {
  CLEAR: 'C',
  NEGATIVE: '+/-',
  PERCENT: '%',
};

const EXP = {
  PLUS: '+',
  MINUS: '-',
  MULTIPLY: '×',
  DEVIDE: '÷',
};

const NumberBtn = props => {
  return (
    <a
      className={`block block--num ${props.className}`}
      onClick={() => props.onClick(props.num)}
    >
      {props.num}
    </a>
  );
};

NumberBtn.defaultProps = {
  className: '',
};

const CtrlBtn = props => {
  return (
    <a className="block block--ctrl" onClick={() => props.onClick(props.type)}>
      {props.type}
    </a>
  );
};

const ExpBtn = props => {
  return (
    <a className="block block--exp" onClick={() => props.onClick(props.type)}>
      {props.type}
    </a>
  );
};

const CommonBtn = props => {
  const { type, value, className } = props;
  return (
    <a
      className={`block block--${type} ${className}`}
      onClick={() => props.onClick(type, value)}
    >
      {value}
    </a>
  );
};

class Caculator extends React.Component {
  state = this.getInitialState();

  getInitialState() {
    return {
      number1: '0',
      exp: '',
      number2: '',
      step: STEP.NUMBER_1,
    };
  }

  getCurrentStepNumber = () => {
    const { step, number1, number2 } = this.state;
    return step === STEP.NUMBER_1 ? number1 : number2;
  };

  setCurrentStepNumber = number => {
    const { step } = this.state;
    this.setState({ [step === STEP.NUMBER_1 ? 'number1' : 'number2']: number });
  };

  onChangeNumber = async num => {
    let number = this.getCurrentStepNumber();
    // 开头不能输入多个0
    if (number === '0' && num === 0) {
      return;
    }
    // 不能输入多个.
    else if (num === '.' && number.indexOf('.') !== -1) {
      return;
    }
    // 人性化输入.
    else if (number === '' && num === '.') {
      number = `0.`;
    }
    // 保证第一个数不为0
    else if (number === '0' && num !== 0 && num !== '.') {
      number = String(num);
    }
    // 正常输入的情况
    else {
      number = `${number}${num}`;
    }
    this.setCurrentStepNumber(number);
  };

  onBtnClick = (type, value) => {
    if (type === BTN_TYPE.NUMBER) {
      this.onChangeNumber(value);
      return;
    }
    if (type === BTN_TYPE.EXP) {
      this.onChangeExp(value);
      return;
    }
  };

  onChangeExp = exp => {
    this.setState({ exp, step: STEP.NUMBER_2 });
  };

  onGetResult = () => {
    const { exp, number2 } = this.state;
    let { number1 } = this.state;
    switch (exp) {
      case '+':
        number1 = String(Number(number1) + Number(number2));
        break;
      case '-':
        number1 = String(Number(number1) - Number(number2));
        break;
      case '÷':
        number1 = String(Number(number1) / Number(number2));
        break;
      case '×':
        number1 = String(Number(number1) * Number(number2));
        break;
      default:
        break;
    }
    this.setState({
      ...this.getInitialState(),
      number1,
    });
  };

  onCtrl = type => {
    if (type === CTRL.CLEAR) {
      this.setState(this.getInitialState());
      return;
    }
    if (type === CTRL.NEGATIVE) {
      let number = this.getCurrentStepNumber();
      if (number[0] === '-') {
        number = number.substring(1);
      } else {
        number = `-${number}`;
      }
      this.setCurrentStepNumber(number);
      return;
    }
    if (type === CTRL.PERCENT) {
      let number = this.getCurrentStepNumber();
      number = number / 100;
      this.setCurrentStepNumber(number);
    }
  };

  render() {
    const { number1, number2 } = this.state;

    let number = this.getCurrentStepNumber();
    if (STEP.NUMBER_2 && number2 === '') {
      number = number1;
    }

    return (
      <>
        <div className="caculator">
          <div className="result-table">{number}</div>
          <div className="operation-table">
            <CtrlBtn type={CTRL.CLEAR} onClick={this.onCtrl} />
            <CtrlBtn type={CTRL.NEGATIVE} onClick={this.onCtrl} />
            <CtrlBtn type={CTRL.PERCENT} onClick={this.onCtrl} />
            <ExpBtn type={EXP.DEVIDE} onClick={this.onChangeExp} />
            <NumberBtn num={7} onClick={this.onChangeNumber} />
            <NumberBtn num={8} onClick={this.onChangeNumber} />
            <NumberBtn num={9} onClick={this.onChangeNumber} />
            <ExpBtn type={EXP.MULTIPLY} onClick={this.onChangeExp} />
            <NumberBtn num={4} onClick={this.onChangeNumber} />
            <NumberBtn num={5} onClick={this.onChangeNumber} />
            <NumberBtn num={6} onClick={this.onChangeNumber} />
            <CommonBtn
              value={EXP.MINUS}
              type={BTN_TYPE.EXP}
              onClick={this.onBtnClick}
            />
            <CommonBtn
              value={1}
              type={BTN_TYPE.NUMBER}
              onClick={this.onBtnClick}
            />
            <NumberBtn num={2} onClick={this.onChangeNumber} />
            <NumberBtn num={3} onClick={this.onChangeNumber} />
            <ExpBtn type={EXP.PLUS} onClick={this.onChangeExp} />
            <NumberBtn
              className="block--double"
              num={0}
              onClick={this.onChangeNumber}
            />
            {/* 
            <a
              className="block block--num block--double"
              onClick={() => this.onChangeNumber(0)}
            >
              0
            </a> */}
            <NumberBtn num={'.'} onClick={this.onChangeNumber} />
            <a className="block block--exp" onClick={this.onGetResult}>
              =
            </a>
          </div>
        </div>
        {JSON.stringify(this.state)}
      </>
    );
  }
}

export default Caculator;
