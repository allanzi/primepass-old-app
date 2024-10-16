/* eslint-disable react/no-unused-prop-types, react/require-default-props */
import React, { useCallback, useState, useEffect } from 'react';
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';
import playIcon from '../../assets/img/playIcon.png';
import checkIcon from '../../assets/img/check.png';
import padLockIcon from '../../assets/img/padlock-white.png';
import icon from '../../assets/img/IconArrowRight.png';
import { useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';

import * as S from './styles';

type ProvicerStateType = 'available' | 'locked' | 'not-defined';
interface Title {
  title?: string;
  showTrailer?: boolean;
  providerState?: ProvicerStateType;
  link?: any;
  screenName?: string;
  tagFlow?: string;
  tagGroup?: string;
  tagContext?: string;
  tagSection?: string;
  tagName?: string;
  tagDescription?: string;
  y: Animated.Value;
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: '100%',
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: Platform.OS === 'ios' ? 45 : 35,
    zIndex: 300,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
});

const HeaderContent: React.FC<Title> = ({
  title,
  showTrailer = false,
  providerState = 'not-defined',
  link,
  screenName,
  tagFlow,
  tagGroup,
  tagContext,
  tagSection,
  tagDescription,
  y,
}) => {
  const navigation = useNavigation();
  const [previousScreen, setPreviousScreen] = useState<string>();

  const { width } = useWindowDimensions();
  const { user } = useAuth();
  const { logEvent } = useAction();

  const bgColor = y.interpolate({
    inputRange: [0, 400],
    outputRange: ['transparent', '#212121'],
    extrapolate: 'clamp',
  });

  const color = y.interpolate({
    inputRange: [0, 400],
    outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    setPreviousScreen(screenName);
  }, [screenName]);

  const handleNavigate = useCallback(() => {
    switch (screenName) {
      case 'TheatersService':
        navigation.navigate('Theaters', {
          screen: screenName,
        });
        break;
      case 'Home':
        navigation.navigate('Home');
        break;
      case 'Content':
        navigation.goBack();
        break;
      case 'Music':
        navigation.goBack();
        break;
      case 'StreamTV':
        navigation.goBack();
        break;
      default:
        navigation.goBack();
        break;
    }
  }, [previousScreen, screenName]);

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
      <LinearGradient
        style={{
          position: 'absolute',
          top: -40,
          left: 0,
          right: 0,
          width,
          height: 200,
          zIndex: -1,
        }}
        colors={['#212121', 'transparent', 'transparent']}
      />
      <S.BackButton onPress={handleNavigate}>
        <Image source={icon} width={42} height={42} />
      </S.BackButton>
      {title && (
        <S.TitleContainer hasTrailer={link}>
          <S.Title numberOfLines={1} style={{ color }}>{title}</S.Title>
        </S.TitleContainer>
      )}
      {link && (
        <S.TrailerContainer>
          {providerState !== 'not-defined' && (
            <S.TrailerButton>
              <S.Span>{providerState === 'locked' ? 'Bloqueado' : 'Disponível'}</S.Span>
              <Image source={providerState === 'locked' ? padLockIcon : checkIcon} width={42} height={42} />
            </S.TrailerButton>
          )}

          {showTrailer && (
            <S.TrailerButton
              onPress={() => {
                logEvent({
                  type: 'log-event',
                  flow: tagFlow,
                  group: tagGroup,
                  context: tagContext,
                  section: tagSection,
                  description: tagDescription,
                  payloadData: {
                    title: tagDescription,
                  },
                  userId: user ? user.id : '0',
                });
                Linking.openURL(link);
              }}
            >
              <S.Span>Ver o trailer</S.Span>
              <Image source={playIcon} width={42} height={42} />
            </S.TrailerButton>
          )}
        </S.TrailerContainer>
      )}
    </Animated.View>
  );
};

export default HeaderContent;
