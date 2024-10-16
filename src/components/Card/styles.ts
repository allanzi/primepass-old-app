import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

export const Card = styled.TouchableWithoutFeedback``;

export const Container = styled.View``;

export const Thumbnail = styled(FastImage)`
  width: 150px;
  height: 150px;
  border-radius: 5px;
`;

export const Tag = styled.Text`
  top: 8px;
  left: 8px;
  z-index: 100;
  position: absolute;
  border-radius: 50px;
  font-size: 8px;
  color: #fff;
  padding: 2px 10px 2px 10px;
`;

export const Title = styled.Text`
  color: #ccc;
  font-size: 11px;
  width: 150px;
  margin-top: 6px;
`;

export const Subtitle = styled.Text`
  color: #ccc;
  font-size: 9px;
`;
