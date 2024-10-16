/* eslint-disable max-len, @typescript-eslint/no-use-before-define, react/require-default-props, no-plusplus */
import React, {
  useCallback, useState, useRef, useEffect,
} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, Platform } from 'react-native';

import ArrowRight from '../../assets/img/ArrowRight.png';
import ArrowLeft from '../../assets/img/ArrowLeft.png';
import ArrowWhiteRight from '../../assets/img/ArrowWhiteRight.png';
import ArrowWhiteLeft from '../../assets/img/ArrowWhiteLeft.png';
import * as S from './styles';

interface SliderProps {
  data: number;
  available?: number;
  beginZero?: boolean;
  onSelectedAmount?(item: number): void;
}

const Slider: React.FC<SliderProps> = ({
  data,
  beginZero = false,
  available = 0,
  onSelectedAmount,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<ScrollView>(null);
  const [ticketArray, setTicketArray] = useState([] as Array<number>);
  const ticketAvailable = available <= data ? available : data;
  const lastIndex = beginZero ? ticketAvailable : ticketAvailable - 1;

  useEffect(() => {
    if (onSelectedAmount) {
      onSelectedAmount(activeIndex);
    }
  }, [activeIndex]);

  useFocusEffect(
    useCallback(() => {
      // eslint-disable-next-line no-use-before-define
      makeTicketArray();
      return () => {
        setActiveIndex(0);
        ref.current?.scrollTo({ x: 0, y: 0, animated: true });
      };
    }, []),
  );

  const makeTicketArray = useCallback(() => {
    const ticketAmount = data;
    const array: Array<number> = [];
    if (beginZero) {
      for (let i = ticketAmount; i >= 0; i--) {
        array.push(i);
      }
    } else {
      for (let i = ticketAmount; i > 0; i--) {
        array.push(i);
      }
    }
    array.sort();
    return setTicketArray(array);
  }, []);

  const scrollTo = useCallback((state) => {
    const isIOS = Platform.OS === 'ios';
    const offset = isIOS ? 34 : 44;
    ref.current?.scrollTo({ x: state * offset, y: 0, animated: true });
  }, []);

  const handleIncrement = () => {
    setActiveIndex((prevState) => {
      if (prevState === lastIndex) {
        return prevState;
      }
      const state = prevState + 1;
      scrollTo(state);
      return state;
    });
  };

  const handleDecrement = useCallback(() => {
    setActiveIndex((prevState) => {
      if (prevState === 0) {
        return prevState;
      }
      const state = prevState - 1;
      scrollTo(state);
      return state;
    });
  }, []);

  return (
    <S.Container>
      <S.ButtonLeft active={activeIndex > 0} onPress={() => handleDecrement()}>
        {activeIndex === 0 ? (
          <S.Icon source={ArrowLeft} />
        ) : (
          <S.Icon source={ArrowWhiteLeft} />
        )}
      </S.ButtonLeft>
      <S.ContainerTicketsList
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        ref={ref}
        scrollToOverflowEnabled
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {ticketArray.map((item, index) => {
          if (index === activeIndex) {
            return (
              <S.ActiveItem key={`i-${String(index)}`}>
                <S.TextItemActive>{item}</S.TextItemActive>
              </S.ActiveItem>
            );
          }
          if (
            index < ticketAvailable
            || (beginZero === true && index <= ticketAvailable)
          ) {
            return (
              <S.Item key={`i-${String(index)}`} onPress={() => setActiveIndex(index)}>
                <S.TextItem>{item}</S.TextItem>
              </S.Item>
            );
          }
          return (
            <S.DisabledItem index={index} key={item}>
              <S.TextItem>{item}</S.TextItem>
            </S.DisabledItem>
          );
        })}
      </S.ContainerTicketsList>

      {activeIndex === lastIndex || ticketAvailable <= 0 ? (
        <S.ButtonRight active={false} onPress={() => {}}>
          <S.Icon source={ArrowRight} />
        </S.ButtonRight>
      ) : (
        <S.ButtonRight
          active={activeIndex !== lastIndex}
          onPress={() => handleIncrement()}
        >
          <S.Icon source={ArrowWhiteRight} />
        </S.ButtonRight>
      )}
    </S.Container>
  );
};

export default Slider;
