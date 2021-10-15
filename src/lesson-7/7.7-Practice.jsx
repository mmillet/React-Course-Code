import React, {
  useState,
  useEffect,
  useContext,
  useImperativeHandle,
  forwardRef,
  useRef,
  useCallback,
} from 'react';
import axios from 'axios';
import { useAsync } from './7.3-UseAsync';
import { useForm } from './7.0-UseForm';

import './7.7-Practice.css';

const AlarmContext = React.createContext({});

// 自定义 Hook：每秒计时器
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

const getRemoteTimestamp = async () => {
  const res = await axios.get('http://120.25.62.254:9999/course/now');
  return res.data.data;
};

// 通过时间戳获取时间
const getDateValue = timestamp => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [hour, minute, second];
};

// 指针样式
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

// 格式化时间
const formatTime = (hour, minute, second) => {
  return [hour, minute, second]
    .map(value => value.toString().padStart(2, '0'))
    .join(':');
};

// 自定义 Hook：返回服务端或本地的时间戳
const useNow = (remote, tick) => {
  const [timestamp, setTimestamp] = useState(Date.now());
  const remoteRef = useRef();
  const { data, loading } = useAsync(async () => {
    const remoteChanged = remoteRef.current !== remote;
    let newTimestamp = timestamp;
    // 每 5 秒同步一次
    if (remoteChanged) {
      newTimestamp = remote ? await getRemoteTimestamp() : Date.now();
    } else if (remote && tick % 5 === 0) {
      newTimestamp = await getRemoteTimestamp();
    } else {
      newTimestamp = newTimestamp + 1000;
    }
    remoteRef.current = remote;
    return newTimestamp;
  }, [remote, tick]);

  useEffect(() => {
    data && setTimestamp(data);
  }, [data]);

  return [timestamp, setTimestamp, loading];
};

// 时间组件
const Clock = (props, ref) => {
  const [pause, setPause] = useState(false);
  const { time, message } = useContext(AlarmContext);
  const tick = useTick(pause);
  const [now, setNow, loading] = useNow(props.remote, tick);

  const [hour, minute, second] = getDateValue(now);
  const style = getPointStyle(hour, minute, second);
  const formatedDate = formatTime(hour, minute, second);

  useImperativeHandle(
    ref,
    () => ({
      toggle: () => {
        setPause(!pause);
        return !pause;
      },
      setTime: timeStr => {
        const [hour, minute, second] = timeStr.split(':');
        const date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);
        date.setSeconds(second);
        setNow(date.getTime());
      },
    }),
    [pause]
  );

  useEffect(() => {
    if (time === formatedDate) {
      console.log(message);
    }
    props.onChange && props.onChange(formatedDate);
  }, [formatedDate]);

  return (
    <>
      {loading && <span>loading...</span>}
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
    </>
  );
};

// 时间表单组件
const DateForm = props => {
  const [foucs, setFocus] = useState(false);
  const [values, getFieldProps, setFieldsValue] = useForm();

  useEffect(() => {
    if (props.value && !foucs) {
      const [hour, minute, second] = props.value.split(':');
      setFieldsValue({ hour, minute, second });
    }
  }, [props.value]);

  useEffect(() => {
    if (foucs && values.hour && values.minute && values.second) {
      const formatedTime = formatTime(
        values.hour,
        values.minute,
        values.second
      );
      props && props.onChange(formatedTime);
    }
  }, [values]);

  return (
    <>
      <input
        maxLength="2"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...getFieldProps('hour')}
      />
      :
      <input
        maxLength="2"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...getFieldProps('minute')}
      />
      :
      <input
        maxLength="2"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...getFieldProps('second')}
      />
    </>
  );
};

// 包装 Ref 和 Pure Render
const ClockWithRef = React.memo(forwardRef(Clock));

// 根组件
const Demo = () => {
  const [date, setDate] = useState('');
  const [pause, setPause] = useState(false);
  const [remote, setRemote] = useState(false);
  const ref = useRef();

  const onClockChange = useCallback(date => {
    setDate(date);
  }, []);

  const onFormChange = useCallback(values => {
    ref.current.setTime(values);
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
      <button onClick={() => setRemote(!remote)}>
        {remote ? '服务器时间' : '本地时间'}
      </button>
      <ClockWithRef onChange={onClockChange} remote={remote} ref={ref} />
      <div className="parent-time">
        {remote ? date : <DateForm onChange={onFormChange} value={date} />}
      </div>
    </AlarmContext.Provider>
  );
};

export default Demo;
