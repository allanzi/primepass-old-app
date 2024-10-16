import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
  justify-content: space-between;
`;

export const Content = styled.View``;

export const Title = styled.Text`
  padding: 30px 20px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const FormContainer = styled.View`
  margin: 40px 20px 0 20px;
`;

export const ForgotButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10%;
`;

export const ForgotPassWordText = styled.Text`
  color: ${({ theme }) => theme.colors.colorTextNotRecivedCode};
  font-weight: 800;
`;

export const ButtonContainer = styled.View`
  margin: 0 20px 40px 20px;
  justify-content: space-around;
`;

export const Separator = styled.View`
  width: 100%;
  height: 16px;
`;
