import styled from 'styled-components/native';
import { Animated, Pressable } from 'react-native';
import ImageCustom from '../Image';

export const PressComponent = styled(Pressable)``;

export const Container = styled(Animated.View)`
  border-radius: 8px;
  width: 220px;
  height: 146px;
  margin-right: 20px;
  /* margin-top: 8px; */
  overflow: hidden;
  border: 1px solid #232323;
`;

export const Image = styled(ImageCustom)`
  border-radius: 8px;
  width: 100%;
  height:100%;
  justify-content: space-between;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  width: 100%;
  z-index: 100;
  margin-left: 10px;
  margin-top: 5px;
`;

export const LabelContainer = styled.View`
  position: relative;
  bottom: 0;
  width: 100%;
  z-index: 100;
`;

export const Logo = styled.Image`
  height: 25px;
  width: 25px;
  margin-right: 26px;
`;
