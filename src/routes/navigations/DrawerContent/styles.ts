import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  border-bottom-width: 1px;
  border-top-width: 0px;
  border-color: ${({ theme }) => theme.colors.borderConfigColor};
`;

export const UserSection = styled.TouchableOpacity`
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContentUser = styled.View`
  align-items: flex-start;
  margin-left: 10px;
`;

export const Title = styled.Text`
  font-size: 16px;
  margin-top: 3px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Caption = styled.Text`
  margin-top: 2px;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const ContentBalance = styled.View`
  padding: 0 20px 20px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Balance = styled.Text`
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  margin-left: 4px;
  color: ${({ theme }) => theme.colors.white};
`;

export const InfoRow = styled.View`
  align-items: flex-start;
  margin-left: 10px;
  flex-direction: row;
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 15px;
`;

export const DrawerSection = styled.View`
  margin-top: 15px;
`;

export const Paragraph = styled.Text`
  font-weight: bold;
  margin-right: 3px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  /* margin-right: 20px; */
`;

export const Preference = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 16px;
`;

export const Letter = styled.Text`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  text-transform: uppercase;
`;

export const Avatar = styled.View`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background: ${({ theme }) => theme.colors.profile};
`;

export const UserImage = styled.Image`
  width: 50px;
  height: 50px;
`;

export const MenuItem = styled.TouchableOpacity`
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-top-width: 0px;
  border-color: ${({ theme }) => theme.colors.borderConfigColor};
`;

export const ContentInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Info = styled.View`
  align-items: flex-start;
  margin-left: 10px;
`;

export const Label = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const IconMenu = styled.Image`
  width: 24px;
  height: 24px;
`;

export const IconBadgeContent = styled.View`
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
`;

export const Icon = styled.Image`
  margin-left: 8px;
  width: 15px;
  height: 15px;
`;

export const ContainerLogo = styled.TouchableOpacity`
  width: 200px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: 100%;
  height: 100%;
`;
