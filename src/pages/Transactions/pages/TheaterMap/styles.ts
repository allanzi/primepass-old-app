import styled from 'styled-components/native';
import MapView from 'react-native-maps';

export const Container = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const ContainerHeader = styled.View`
  padding: 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background};
  z-index: 2;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Distance = styled.Text`
  font-size: 10px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.white};
  margin-left: 2px;
`;

export const ColumnInfo = styled.View`
  margin-top: 16px;
  width: 85%;
`;

export const Shopping = styled.Text`
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const Address = styled.Text`
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.white};
`;

export const ColumnCopy = styled.TouchableOpacity`
  margin-top: 16px;
  width: 15%;
  display:flex;
  align-items: center;
  justify-content: center;
`;

export const LegendIcon = styled.Text`
  font-size: 10px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-top: 4px;
`;

export const TheaterName = styled.Text`
  margin-left: 16px;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.white};
`;

export const MapWarpper = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const MapViewWarpper = styled(MapView)`
  height: 111%;
  width: 100%;
  z-index: 1;
  justify-content: center;
  align-items: center;
`;
