/* eslint-disable react/require-default-props */
import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

import * as S from './styles';

interface ToastProps {
  canceled?: boolean;
}

const Toast: React.FC<ToastProps> = ({ canceled }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isCanceled, setIsCanceled] = useState<boolean>(false);

  useEffect(() => {
    setIsCanceled(canceled);

    Animated.timing(scrollY, {
      toValue: 108,
      duration: 0,
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
      canceled={isCanceled}
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
