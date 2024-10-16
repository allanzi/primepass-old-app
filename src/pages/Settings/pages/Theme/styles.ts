import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Item = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px 20px;
`;

export const Label = styled.Text`
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.colorText};
  text-transform: capitalize;
`;
