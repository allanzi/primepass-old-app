import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.backgroundModalDetails};
  flex: 1;
  border-radius: 8px;
  margin: 128px 16px 0px 16px;
  padding: 32px 16px;
  height: 566px;
  position: relative;
`;

export const Title = styled.Text`
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Subtitle = styled.Text`
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-top: 8px;
  margin-bottom: 32px;
  padding: 0 2px;
`;

export const Link = styled.Text`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.colorInfoText};
`;

export const ClearButton = styled.TouchableOpacity`
  width: 16px;
  height: 24px;
  justify-content: center;
`;

export const TitleMedium = styled.Text`
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.white};
  margin: 32px 0;
`;

export const List = styled.View`
  margin-bottom: 64px;
`;

export const Session = styled.TouchableOpacity`
  border: 2px solid ${({ theme }) => theme.colors.primaryBlue};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin-bottom: 16px;
`;

export const TextSession = styled.Text`
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

export const ContainerLoading = styled.View`
  margin: 20px auto;
`;

export const SearchContainer = styled.View`
  position: absolute;
  background-color: #6B6B6B;
  margin: 4px 16px 0px 26px;
  padding: 0px 10px 0px 10px;
  border-radius: 8px;
  top: 205px;
  z-index: 10;
  width: 93%;
`;

export const SearchContainerText = styled.Text`
  color: #CCCCCC;
  padding: 16px;
`;

export const SearchContainerLoading = styled.Text`
  margin: 16px auto;
`;

export const Bold = styled.Text`
  font-weight: bold;
  color: #FFF;
`;

export const TouchableOpacity = styled.TouchableOpacity``;
