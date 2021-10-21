import React, {
  useState,
  useEffect,
  useContext,
  useImperativeHandle,
  forwardRef,
  useRef,
  useCallback,
} from 'react';
import './6.6-Practice.css';

const AlarmContext = React.createContext({});

const useTick = pause => {
  const [tick, setTick] = useState(0);
  let timer = 0;
  useEffect(() => {
    if (pause) {
      return;
    }
    timer = setTimeout(() => {
      setTick(tick + 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [tick, pause]);
  return tick;
};

const getCurrentDateValue = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [hour, minute, second];
};

const getPointStyle = (hour, minute, second) => {
  const secondRotate = (second / 60) * 360;
  const minuteRotate = (minute / 60) * 360 + secondRotate / 60;
  const hourRotate = (hour / 12) * 360 + minuteRotate / 12;
  return {
    second: { transform: `translate(-50%, 0) rotate(${secondRotate}deg)` },
    minute: { transform: `translate(-50%, 0) rotate(${minuteRotate}deg)` },
    hour: { transform: `translate(-50%, 0) rotate(${hourRotate}deg)` },
  };
};

const formatNumber = value => value.toString().padStart(2, '0');

const Clock = (props, ref) => {
  const [pause, setPause] = useState(false);
  const { time, message } = useContext(AlarmContext);
  const tick = useTick(pause);
  const [hour, minute, second] = getCurrentDateValue();
  const style = getPointStyle(hour, minute, second);

  const formatedDate = `${formatNumber(hour)}:${formatNumber(
    minute
  )}:${formatNumber(second)}`;

  useImperativeHandle(
    ref,
    () => ({
      toggle: () => {
        setPause(!pause);
        return !pause;
      },
    }),
    [pause]
  );

  useEffect(() => {
    if (time === formatedDate) {
      console.log(message);
    }
    props.onChange && props.onChange(formatedDate);
  }, [tick]);

  // 打印渲染次数和秒数;
  console.log(`render`, tick);

  return (
    <div className="clock">
      <div className="background">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="point"></div>
      <div className="hour" style={style.hour}></div>
      <div className="minute" style={style.minute}></div>
      <div className="second" style={style.second}></div>
    </div>
  );
};

const ClockWithRef = React.memo(forwardRef(Clock));

const Demo = () => {
  const [date, setDate] = useState('');
  const [pause, setPause] = useState(false);
  const ref = useRef();

  const onClockChange = useCallback(date => {
    setDate(date);
  }, []);

  const onToggle = () => {
    const pause = ref.current.toggle();
    setPause(pause);
  };

  const intialContext = React.useMemo(() => {
    return { time: '19:09:16', message: '起床了' };
  }, []);

  return (
    <AlarmContext.Provider value={intialContext}>
      <button onClick={onToggle}>{pause ? '恢复' : '暂停'}</button>
      <ClockWithRef onChange={onClockChange} ref={ref} />
      <div className="parent-time">{date}</div>
    </AlarmContext.Provider>
  );
};

export default Demo;
