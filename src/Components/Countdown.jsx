/* eslint-disable react/prop-types */
import React from "react";
import Countdown from "react-countdown";

const CountdownTimer = ({ key, duration, onComplete }) => {
  return (
    <div className="text-lg font-bold">
      <Countdown
        className="font-bold text-5xl"
        key={key}
        date={Date.now() + duration}
        onComplete={onComplete}
        renderer={({ minutes, seconds, completed }) => {
          if (completed) {
            return <span>Time's up!</span>;
          } else {
            return (
              <span>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </span>
            );
          }
        }}
      />
    </div>
  );
};

export default CountdownTimer;
