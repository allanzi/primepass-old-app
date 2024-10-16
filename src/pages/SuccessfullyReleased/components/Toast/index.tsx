import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import * as S from './styles';

const Toast: React.FC = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scrollY, {
      toValue: 108,
      duration: 1000,
      useNativeDriver: false,
      // easing: Easing.elastic(9)
    }).start();

    // setTimeout(() => Animated.timing(scrollY, {
    //   toValue: 0,
    //   duration: 500,
    //   useNativeDriver: false,
    // }).start(), 2000);
  }, []);

  return (
    <S.Container
      style={{
        transform: [
          {
            translateY: scrollY,
          },
        ],
      }}
    />
  );
};

export default Toast;
