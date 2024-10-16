import styled from 'styled-components/native';
import { FlatList, Animated } from 'react-native';

interface ItemProps {
  image: string;
  title: string;
  genre: Array<string>;
  service_type: string;
  service_name: string;
  logo: string;
  autor?: string;
}

const StyledFlatList = styled(FlatList as new () => FlatList<ItemProps>)``;

export const AnimatedFlatlist = Animated.createAnimatedComponent(
  StyledFlatList,
);

export const Container = styled.View`
  height: 200px;
  flex: 1;
  width: 100%;
  padding: 0 0 0 20px;
`;

export const CarouselWrapper = styled.View`
  width: 100%;
  flex-direction: row;
`;
