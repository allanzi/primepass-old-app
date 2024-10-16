/* eslint-disable max-len, @typescript-eslint/naming-convention, no-underscore-dangle, react/require-default-props */
import React, { useRef } from 'react';
import { Animated, useWindowDimensions } from 'react-native';

import { BannerType } from './components/Banner/types';
import Banner from './components/Banner';
import * as S from './styles';

interface CarouselProps {
  data: Array<BannerType>;
}

const Carousel: React.FC<CarouselProps> = ({
  data,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();

  const _onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX,
          },
        },
      },
    ],
    {
      useNativeDriver: false,
    },
  );

  return (
    <>
      <S.HighlightCarousel>
        <S.CarouselContainer
          horizontal
          onScroll={_onScroll}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {data.map((item: BannerType) => (
            <S.Container key={item.id}>
              <Banner banner={item} />
            </S.Container>
          ))}
        </S.CarouselContainer>
      </S.HighlightCarousel>

      <S.PaginationContainer>
        {data?.map((_: any, id: number) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (id - 1),
              windowWidth * id,
              windowWidth * (id + 1),
            ],
            outputRange: [8, 32, 8],
            extrapolate: 'clamp',
          });

          const backgroundColor = scrollX.interpolate({
            inputRange: [
              windowWidth * (id - 1),
              windowWidth * id,
              windowWidth * (id + 1),
            ],
            outputRange: [
              'rgba(81, 81, 81, 1)',
              'rgba(204, 204, 204, 1)',
              'rgba(81, 81, 81, 1)',
            ],
            extrapolate: 'clamp',
          });

          return <S.Dot key={`i-${String(id)}`} style={{ width, backgroundColor }} />;
        })}
      </S.PaginationContainer>
    </>
  );
};

export default Carousel;
