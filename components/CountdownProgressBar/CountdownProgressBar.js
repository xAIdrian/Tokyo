import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Button } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import styles from './countdownprogressbar.style';
import COLORS from '../../constants/theme';

const CountdownProgressBar = ({
  countdownDuration = 30,
  increment = 1,
  handleTimerEnd = () => {
    console.log('Timer reached zero');
  },
}) => {
  const [timeLeft, setTimeLeft] = useState(countdownDuration); 
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    toggleTimer();
  }, []);

  useLayoutEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - increment);
      }, increment * 1000);
    } else if (timeLeft === 0) {
      // Call a function when the timer reaches zero
      handleTimerEnd();
      setTimerActive(false);
    }

    // Clean up the interval on unmount
    return () => clearInterval(interval); 
  }, [timerActive, timeLeft]);

  const toggleTimer = () => {
    setTimerActive((prevActive) => !prevActive);
    if (!timerActive) {
      // Reset the timer
      setTimeLeft(countdownDuration); 
    }
  };

  return (
    <View
      style={styles.container}
    >
      <ProgressBar
        progress={timeLeft / countdownDuration} 
        borderWidth={0}
        height={32}
        borderRadius={0}
        width={null}
        style={{
          height: '100%',
          padding: 0,
          margin: 0,
        }}
      />
    </View>
  );
};

export default CountdownProgressBar;
