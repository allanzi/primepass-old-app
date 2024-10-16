import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 24px;
  padding: 0 10px;
  align-items: center;
  align-self: flex-start;
`;

export const Title = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.colorText};
`;
