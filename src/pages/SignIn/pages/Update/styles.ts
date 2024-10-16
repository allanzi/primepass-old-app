import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
  justify-content: space-between;
  padding: 0 10px;
`;

export const TitleContainer = styled.View`
  padding: 10px 20px 40px 20px;
`;

export const Title = styled.Text`
  margin-top: 30px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.colorText};
  width: 300px;
`;

export const FormContainer = styled.View`
  margin: 0 20px;
`;

export const Footer = styled.View`
  margin: 0 20px 60px 20px;
`;
