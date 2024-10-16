/* eslint-disable max-len, @typescript-eslint/naming-convention, no-underscore-dangle, import/no-extraneous-dependencies */
import React, { useRef, useState } from 'react';
import { Animated, StatusBar, useWindowDimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-community/async-storage';

import ArrowRight from '../../assets/img/ArrowWhiteRight.png';
import ArrowLeft from '../../assets/img/ArrowWhiteLeft.png';
import Onboard1 from '../../assets/img/onboard/SMARTPHONE1.png';
import Onboard2 from '../../assets/img/onboard/SMARTPHONE2.png';
import Onboard4 from '../../assets/img/onboard/SMARTPHONE4.png';
import { useLocation } from '../../hooks/location';
import * as S from './styles';

const Onboard = () => {
  const data = [
    {
      id: 'badah',
      url: Onboard1,
      title: 'Comece agora',
      subtitle: 'Adquira um plano e tenha toda\ndiversão direto do smartphone.',
      showLocationButtons: false,
    },
    {
      id: 'badah1',
      url: Onboard2,
      title: 'Streaming do seu jeito',
      subtitle:
        'Assista filmes e séries de onde estiver e\naproveite para ouvir milhões de músicas!',
      showLocationButtons: false,
    },
    {
      id: 'badah4',
      url: Onboard4,
      title: 'Precisamos saber sua localização',
      subtitle:
        'A Primepass utiliza dados de localização\npara encontrar cinemas próximos a você.',
      showLocationButtons: true,
    },
  ];

  const { width: windowWidth } = useWindowDimensions();
  const carouselContainerRef = useRef();
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const [nextScrollX, setNextScrollX] = useState(0);
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const { startConfiguration } = useLocation();

  const _onScroll = ({ nativeEvent }) => {
    setScrollX(nativeEvent.contentOffset.x);
    scrollXAnimated.setValue(nativeEvent.contentOffset.x);

    if (nativeEvent.contentOffset.x === nextScrollX) {
      setNextScrollX(0);
      setIsScrolling(false);
    }
  };

  const handleLeftNavigate = () => {
    if (isScrolling) {
      return;
    }

    const next = scrollX - windowWidth;
    setNextScrollX(next);
    setIsScrolling(true);

    carouselContainerRef.current?.scrollTo({
      y: 0,
      x: next,
      animated: true,
    });

    setIsScrolling(false);
  };

  const handleRightNavigate = () => {
    if (isScrolling) {
      return;
    }

    const next = scrollX + windowWidth;
    setNextScrollX(next);
    setIsScrolling(true);

    carouselContainerRef.current?.scrollTo({
      y: 0,
      x: next,
      animated: true,
    });

    setIsScrolling(false);
  };

  const setHasBeenCompleted = () => AsyncStorage.setItem('onboard-completed', 'true');

  const handleHomeNavigate = () => {
    setHasBeenCompleted();
    navigation.navigate('Home');
  };

  const handleAllowLocation = () => {
    if (startConfiguration) {
      startConfiguration();
    }

    handleHomeNavigate();
  };

  return (
    <>
      <S.Maincontainer>
        <StatusBar backgroundColor="#212121" barStyle="light-content" />
        <S.CarouselContainer
          scrollEnabled={!isScrolling}
          ref={carouselContainerRef}
          horizontal
          onScroll={_onScroll}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
        >
          {data.map((item, key) => (
            <S.InsideCarouselContainer key={item.id}>
              {key === 0 ? (
                <S.ArrowContainer />
              ) : (
                <S.ArrowContainer
                  onPress={handleLeftNavigate}
                  disabled={isScrolling}
                >
                  <S.Arrow source={ArrowLeft} />
                </S.ArrowContainer>
              )}

              <S.Fragment>
                <S.Title>{item.title}</S.Title>
                <S.Subtitle>{item.subtitle}</S.Subtitle>
                <S.Image
                  source={item.url}
                  resizeMode={FastImage.resizeMode.contain}
                />

                {item.showLocationButtons && (
                  <S.ButtonContainer>
                    <S.Button disable={false} onPress={handleAllowLocation}>
                      <S.ButtonText>Permitir acesso</S.ButtonText>
                    </S.Button>
                  </S.ButtonContainer>
                )}
              </S.Fragment>

              {key === data.length - 1 ? (
                <S.ArrowContainer />
              ) : (
                <S.ArrowContainer
                  onPress={handleRightNavigate}
                  disabled={isScrolling}
                >
                  <S.Arrow source={ArrowRight} />
                </S.ArrowContainer>
              )}
            </S.InsideCarouselContainer>
          ))}
        </S.CarouselContainer>

        <S.PaginationContainer>
          {data?.map((_, id) => {
            const width = scrollXAnimated.interpolate({
              inputRange: [
                windowWidth * (id - 1),
                windowWidth * id,
                windowWidth * (id + 1),
              ],
              outputRange: [8, 32, 8],
              extrapolate: 'clamp',
            });

            const backgroundColor = scrollXAnimated.interpolate({
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

            return <S.Dot key={_.id} style={{ width, backgroundColor }} />;
          })}
        </S.PaginationContainer>
      </S.Maincontainer>
    </>
  );
};

export default Onboard;
