import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flexGrow: 1
  background: ${({ theme }) => theme.colors.background};
`;

export const TextRegisterTitle = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.colorTitleText};
`;

export const FormContainer = styled.View`
  padding: 20px 30px 10px 30px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  padding: 30px;
  margin-top: 16px;
`;
