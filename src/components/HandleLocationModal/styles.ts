import styled from 'styled-components/native';
import { Dimensions, FlatList, Platform } from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

interface Results {
  place_id?: string;
  description?: string;
  id?: string | number;
}

export const ModalWrapper = styled.View`
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

export const ContainerContent = styled.View`
  background: rgba(0, 0, 0, 0.8);
  flex: 1;
  top: 0;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const CloseModal = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: ${Platform.OS === 'ios' ? '40' : '0'}px;
`;

export const CloseIcon = styled.View`
  align-self: flex-end;
  color: #fff;
  margin-top: 20px;
  margin-right: 20px;
`;

export const MostAccessedCity = styled.View`
  width: 90%;
`;

export const Separator = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 15px;
`;
export const SeparatorItem = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const LineSeparator = styled.View`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.colors.colorBorderInputNotFocused};
`;

export const SearchContainer = styled.View`
  margin-top: 40px;
  justify-content: center;
  align-items: center;
`;

export const InputContainer = styled.View`
  background: transparent;
  width: 90%;
  height: 55px;

  padding: 0 16px;
  margin-bottom: 15px;

  border-radius: 25px;
  border-width: 2px;
  border-color: #ccc;

  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 16px;
  padding: 0 10px 0 10px;
`;

export const ClearInput = styled.TouchableOpacity``;

export const InputIcon = styled.Image``;

export const ResultsLabel = styled.Text`
  align-self: flex-start;
  color: #fff;
  font-size: 16px;
  margin-top: 40px;
`;

export const SearchResultsContainer = styled(
  FlatList as new () => FlatList<Results>,
)`
  width: 90%;
  height: 200px;
  background-color: transparent;
`;

export const ResultItem = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
`;

export const ResultItemContainer = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const SearchResultsItem = styled.Text`
  width: 92%;
  color: #fff;
`;

export const Icon = styled.Image`
  margin-right: 10px;
`;
