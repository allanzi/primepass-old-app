import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const KeyWord = styled(Title)`
  color: ${({ theme }) => theme.colors.white};
`;
