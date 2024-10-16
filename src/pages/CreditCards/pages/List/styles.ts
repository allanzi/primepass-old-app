import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.background};
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const CardContainer = styled.View`
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  flex: 1;
`;

export const CardList = styled.ScrollView``;

export const Title = styled.Text`
  margin-bottom: 16px;
  align-self: flex-start;
  text-align: left;
  font-size: 12px;
  letter-spacing: 0px;
  color: #cccccc;
  opacity: 1;
`;

export const Separator = styled.View`
  margin: 8px;
`;

export const ChangeIndicator = styled.ActivityIndicator`
  position: absolute;
  left: 50%;
`;

export const ContainerLoading = styled.View`
  margin: 40px auto;
`;
