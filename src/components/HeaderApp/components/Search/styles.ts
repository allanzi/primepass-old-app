import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

export const SearchArea = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 999;
  background-color: #000000dd;
`;

export const ClearButton = styled.TouchableOpacity`
  width: 16px;
  height: 24px;
  justify-content: center;
`;

export const IconClear = styled(FastImage)`
  width: 24px;
  height: 24px;
  align-self: center;
`;

export const TopSide = styled.View`
  height: 50px;
  align-items: center;
  justify-content: center;
`;

export const BottomSide = styled.View`
  flex: 1;
  width: 100%;
`;
export const Container = styled.View`
  height: 80%;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.Text`
  color: #fff;
`;

export const Spin = styled.View`
  border-style: solid;
  border-top-width: 3px;
  border-left-width: 3px;
  border-color: #fff;
  border-radius: 40px;
  width: 30px;
  height: 30px;
`;

export const Cernter = styled.View``;
