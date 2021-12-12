import React, { useEffect, useRef } from "react";

interface TimerProps {
  onTimesUpCallBack: () => {};
}

const Timer: React.FC<TimerProps> = ({ onTimesUpCallBack }) => {
  const FULL_DASH_ARRAY = 283;
  const WARNING_THRESHOLD = 10;
  const ALERT_THRESHOLD = 5;

  const COLOR_CODES = {
    info: {
      color: 'green',
    },
    warning: {
      color: 'orange',
      threshold: WARNING_THRESHOLD,
    },
    alert: {
      color: 'red',
      threshold: ALERT_THRESHOLD,
    },
  };

  const TIME_LIMIT = 20;
  let timePassed = 0;
  let timeLeft = TIME_LIMIT;
  let timerInterval: number | null = null;
  let remainingPathColor = COLOR_CODES.info.color;

  useEffect(() => {
    startTimer();

    return () => {
      // clean up interval
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, []);

  const timerLabelRef = useRef<HTMLSpanElement>(null);
  const timerRemainingPathRef = useRef<SVGPathElement>(null);

  const onTimesUp = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  };

  const startTimer = () => {
    timerInterval = window.setInterval(() => {
      timePassed++;
      timeLeft = TIME_LIMIT - timePassed;
      (timerLabelRef.current as HTMLSpanElement).innerHTML =
        formatTime(timeLeft);
      setCircleDasharray();
      setRemainingPathColor(timeLeft);

      if (timeLeft === 0) {
        onTimesUp();
        onTimesUpCallBack();
      }
    }, 1000);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    let secondsInString = seconds.toString();

    if (seconds < 10) {
      secondsInString = `0${seconds}`;
    }

    return `${minutes}:${secondsInString}`;
  };

  const setRemainingPathColor = (timeLeft: number) => {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      timerRemainingPathRef.current?.classList.remove(warning.color);
      timerRemainingPathRef.current?.classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      timerRemainingPathRef.current?.classList.remove(info.color);
      timerRemainingPathRef.current?.classList.add(warning.color);
    }
  };

  const calculateTimeFraction = () => {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  };

  const setCircleDasharray = () => {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    timerRemainingPathRef.current?.setAttribute(
      'stroke-dasharray',
      circleDasharray
    );
  };
  return (
    <div className="base-timer">
      <svg
        className="base-timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="base-timer__circle">
          <circle
            className="base-timer__path-elapsed"
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <path
            ref={timerRemainingPathRef}
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            className={`base-timer__path-remaining ${remainingPathColor}`}
            d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
          ></path>
        </g>
      </svg>
      <span
        ref={timerLabelRef}
        id="base-timer-label"
        className="base-timer__label text-white"
      >
        ${formatTime(timeLeft)}
      </span>
    </div>
  );
};

export default Timer;