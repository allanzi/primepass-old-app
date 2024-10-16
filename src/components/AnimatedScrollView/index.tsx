/* eslint-disable react/jsx-props-no-spreading, react/require-default-props */
import React from 'react';
import {
  Animated,
  NativeSyntheticEvent,
  View,
  RefreshControlProps,
} from 'react-native';

import { useAnimation } from '../../hooks/animation';

interface Offset {
  y: number;
}

interface Event {
  contentOffset: Offset;
}

interface AnimatedScrollProps {
  scrollY: Animated.Value;
  refreshControl?: React.ReactElement<RefreshControlProps>;
  infiniteScroll?: any;
}

const AnimatedScrollView: React.FC<AnimatedScrollProps> = ({
  children,
  scrollY,
  infiniteScroll,
  refreshControl,
  ...props
}) => {
  const { setScrollPosition } = useAnimation();
  return (
    <View
      style={{ position: 'absolute', height: '100%', width: '100%' }}
      {...props}
    >
      <Animated.ScrollView
        refreshControl={refreshControl}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          if (infiniteScroll) {
            infiniteScroll(event);
          }
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {
            listener: (event: NativeSyntheticEvent<Event>) => {
              if (event.nativeEvent?.contentOffset) {
                const {
                  contentOffset: { y },
                } = event.nativeEvent;
                const position = {
                  currentScrollYPosition: y,
                };
                setScrollPosition(position);
              }
            },
            useNativeDriver: false,
          },
        )}
        scrollEventThrottle={16}
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
};

export default AnimatedScrollView;
