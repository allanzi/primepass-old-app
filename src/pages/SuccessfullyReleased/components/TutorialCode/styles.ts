import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 22px 28px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Bold = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Step = styled.Text`
  font-size: 14px;
  line-height: 30px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Section = styled.View`
  margin: 18px 0;
`;
