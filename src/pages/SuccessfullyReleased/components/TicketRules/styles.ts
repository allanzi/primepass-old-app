import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.colorTextButtonDisable};
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 8px;
`;

export const Description = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.white};
`;

export const HighlightText = styled(Description)`
  color: ${({ theme }) => theme.colors.colorError};
`;
