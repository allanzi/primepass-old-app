import styled from 'styled-components/native';
import { Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const HighlightCarousel = styled.View`
  height: 560px;
`;

export const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: -32px;
`;

export const CarouselContainer = styled.ScrollView`
  flex: 1;
`;

export const Dot = styled(Animated.View)`
  height: 8px;
  width: 8px;
  border-radius: 4px;
  background: rgba(81, 81, 81, 1);
  margin: 0 4px;
`;

export const Container = styled.View`
  width: ${width}px;
  height: 100%;
`;
