import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 40px;
  margin-bottom: 30px;
`;

export const LeftSide = styled.View`
  flex: 2;
  align-items: center;
`;

export const ButtonBack = styled.TouchableWithoutFeedback`
  flex: 1;
`;

export const CenterSide = styled.View`
  flex: 10;
  padding-left: 120px;
`;

export const IconGoBack = styled(FastImage)`
  width: 22px;
  height: 22px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
`;
