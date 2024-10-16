import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;

export const Fragment = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Scroll = styled.ScrollView`
`;

export const Container = styled.View`
  padding: 32px;
`;

export const LoadingContainer = styled.View`
  margin-top: 30px;
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 20px;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 14px;
  padding-top: 24px;
`;

export const BottomText = styled.View`
  margin-top: 32px;
  margin-bottom: 47px;
`;

export const ItemsSelectedText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 14px;
`;

export const WarningText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 14px;
  margin-top: 8px;
`;

export const ServiceCardContainer = styled.View`
  margin-top: 16px;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const TouchableOpacity = styled.TouchableOpacity``;

export const ServiceCard = styled.ImageBackground`
  width: ${WIDTH / 2 - 44}px;
  height: ${WIDTH / 2 - 110}px;
  background-color: #fff;
  border-radius: 8px;
  margin-right: 8px;
  margin-bottom: 16px;
  resize-mode: cover;
`;

export const OverlayIcon = styled(FastImage)`
  width: 30px;
  height: 30px;
`;

export const ServiceCardOverlay = styled.View`
  background-color: #147eb5;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  opacity: 0.9;
  justify-content: center;
  align-items: center;
`;
