import React, { useState, useEffect, useContext } from 'react';
import './5.7-Practice.css';

const AlarmContext = React.createContext({});

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

const Clock = () => {
  const { time, message } = useContext(AlarmContext);
  const [tick, setTick] = useState(0);

  let timer = 0;
  useEffect(() => {
    timer = setTimeout(() => {
      setTick(tick + 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [tick]);

  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const style = getPointStyle(hour, minute, second);

  const formatedDate = `${formatNumber(hour)}:${formatNumber(
    minute
  )}:${formatNumber(second)}`;

  useEffect(() => {
    if (time === formatedDate) {
      console.log(message);
    }
  });

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
      <div className="time">{formatedDate}</div>
    </div>
  );
};

const Demo = () => {
  return (
    <AlarmContext.Provider value={{ time: '19:09:16', message: '起床了' }}>
      <Clock />
    </AlarmContext.Provider>
  );
};

export default Demo;
