import styled from 'styled-components/native';
import { ScrollView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

export const Container = styled(ScrollView)`
  flex: 1;
  height: 100%;
  background-color: #ff3;
`;

export const Section = styled.View`
  padding: 24px 0px 0px 2px;
`;

export const Title = styled.Text`
  color: #aaa;
  font-size: 16px;
  padding: 0px 0px 4px 0px;
`;

export const ItemLabel = styled.Text`
  color: #aaa;
  font-size: 15px;
  padding: 0px 0px 4px 0px;
`;
export const ItemIcon = styled(FastImage)`
  width: 22px;
  height: 22px;
  margin-right: 10px;
`;

export const Item = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  padding: 4px 0px 4px 0px
  border-color: #444;
`;

export const ItemSection = styled.FlatList`
  width: 100%;
  padding: 4px 0px 16px 0px;
`;

export const ItemSeparator = styled.View`
  padding: 0px 20px 0px 2px;
`;
