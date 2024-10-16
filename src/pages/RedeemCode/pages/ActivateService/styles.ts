import styled from 'styled-components/native';

export const ContainerLoader = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Fragment = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const CardContainer = styled.Image`
  border-radius: 10px;
  width: 85%;
  height: 180px;
`;

export const CardContainerEmpty = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundModalDetails};
  border-radius: 10px;
  width: 85%;
  height: 180px;
`;

export const Message = styled.Text`
  margin-top: 15px;
  width: 85%;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const LoadContainer = styled.View``;

export const InputContainer = styled.View`
  margin: 20px 20px 0 20px;
  width: 90%;
  flex-direction: column;
`;

export const ActionContainer = styled.View`
  min-width: 90%;
  flex-direction: column;
  margin: 15px 20px 0 20px;
`;

export const CopyContainer = styled.TouchableOpacity``;

export const IconCopy = styled.Image`
  width: 16px;
  height: 16px;
`;
