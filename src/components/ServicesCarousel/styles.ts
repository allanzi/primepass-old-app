import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

export const Image = styled(FastImage)`
  width: 94px;
  height: 34px;
`;

export const Card = styled(TouchableOpacity)`
  width: 146px;
  height: 54px;
  border: 2px solid #515151;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Container = styled.View`
  margin: 16px 0;
  flex: 1;
  flex-direction: row;
  padding-left: 20px;
`;
