/* eslint-disable react/require-default-props, react/no-unused-prop-types */
import React, { useState } from 'react';
import {
  Dimensions, StyleSheet, Animated, Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import logoDark from '../../assets/img/logo-dark.png';
import Search from './components/Search';
import * as S from './styles';

interface HeaderProps {
  animation?: object;
  y: Animated.Value;
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 100 : 60,
    width,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 0,
    paddingBottom: 5,
    zIndex: 100,
  },
});

const HeaderApp: React.FC<HeaderProps> = ({ y }) => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const bgColor = y.interpolate({
    inputRange: [0, 400],
    outputRange: ['transparent', '#212121'],
    extrapolate: 'clamp',
  });

  return (
    <>
      <Animated.View style={[styles.container, { backgroundColor: bgColor, display: openSearch ? 'none' : 'flex' }]}>
        <LinearGradient
          style={{
            position: 'absolute',
            top: -10,
            left: 0,
            right: 0,
            width,
            height: 200,
            zIndex: 1,
          }}
          colors={['#212121', 'transparent', 'transparent']}
        />

        <S.ContainerActions>
          <S.CenterSide>
            <S.Logo source={logoDark} />
          </S.CenterSide>
          {/* <S.RightSide>
            <S.SearchButton onPress={() => setOpenSearch(true)}>
              <SearchIcon width={24} heigth={24} />
            </S.SearchButton>
          </S.RightSide> */}
        </S.ContainerActions>
      </Animated.View>
      <Search show={openSearch} onClose={() => setOpenSearch(false)} />
    </>
  );
};

export default HeaderApp;
