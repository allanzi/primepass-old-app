import { Animated, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import ButtonCustom from '../../components/Button';

const { width } = Dimensions.get('window');

export const HighlightCarousel = styled.View`
  height: 560px;
`;

export const InsideCarouselContainer = styled.View`
  width: ${width}px;
  height: 100%;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const Fragment = styled.View`
  width: 70%;
`;

export const Maincontainer = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const PaginationContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin: 16px 0;
`;

export const Dot = styled(Animated.View)`
  height: 8px;
  width: 8px;
  border-radius: 4px;
  background: rgba(81, 81, 81, 1);
  margin: 0 4px;
`;

export const CarouselContainer = styled.ScrollView`
  flex: 1;
`;

export const Title = styled.Text`
  padding-top: 16px
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

export const Subtitle = styled.Text`
  color: #cccccc;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 16px;
`;

export const Image = styled(FastImage)`
  height: ${width <= 375 ? '60%' : '70%'};
  width: 100%;
  align-self: center;
`;

export const ArrowContainer = styled.TouchableOpacity`
  width: 15%;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Arrow = styled(FastImage)`
  width: 16px;
  height: 32px;
`;

export const Button = styled(ButtonCustom)`
  height: 35px;
  width: 45%;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.colorTextButtonOutline};
  font-size: 14px;
`;

export const ButtonContainer = styled.View`
  width: 120%;
  position: relative;
  left: -2.2%;
  margin-top: 32px;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
