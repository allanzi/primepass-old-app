import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import Button from '../Button';
import Image from '../Image';

export const Gradient = styled(LinearGradient)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 40px;
    z-index: 1;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
`;

export const ButtonStyled = styled(Button)`
  height: 30px;
  margin-top: 8px;
`;

export const Container = styled.View`
  margin-bottom: 16px;
  width: 48%;
  max-width: 160px;
  max-height: 250px;
`;

export const ServiceCard = styled(Image)`
  background-color: #313131;
  width: 100%;
  max-width: 160px;
  max-height: 160px;
  border-radius: 8px;
  overflow: hidden;
  resize-mode: cover;
`;

export const ServiceCardOverlay = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OverlayIcon = styled.Image`
  max-width: 100%;
  min-width: 94px;
  max-height: 100%;
  min-height: 34px;
  resize-mode: contain;
`;

export const OverlayIconUnavailable = styled.Image`
  width: 50px;
  height: 50px;
  resize-mode: contain;
`;

export const ServiceTitle = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  margin-top: 8px;
  text-align: left;
  width: 100%;
`;

export const ServiceSubtitle = styled.Text`
  color: #CCCCCC;
  font-size: 12px;
  margin-top: 4px;
  text-align: left;
`;

export const HeaderCardContainer = styled.View`
  width: 100%;
  position: absolute;
  top: 8px;
  z-index: 100;
  flex-direction: row;
  justify-content: space-between;
`;

export const BadgeContainer = styled.View`
  position: relative;
  left: 8px;
  z-index: 100;
`;

export const StatusContainer = styled.View`
  position: relative;
  right: 8px;
  z-index: 100;
`;
