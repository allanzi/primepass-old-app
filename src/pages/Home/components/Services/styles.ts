import styled from 'styled-components/native';

export const Fragment = styled.View`
  display: flex;
  margin: 16px;
`;

export const Title = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.colorText};
  margin-bottom: 8px;
  align-self: flex-start;
`;

export const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ContainerLoading = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Service = styled.View`
  width: 100%;
`;

export const ServiceCardContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ContainerEmpty = styled.View`
  width: 100%;
  padding: 16px;
  margin-top: 16px;
  border: 1px dashed #515151;
  border-radius: 8px;
`;

export const TextDisable = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.colorTextButtonDisable};
  align-self: center;
  margin: 0 auto;
`;

export const ContentActions = styled.View`
  align-items: center;
  width: 100%;
`;
export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin: 32px auto 16px auto;
  background: ${({ theme }) => theme.colors.primaryBlue};
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.colorTextButton};
  font-size: 14px;
`;
