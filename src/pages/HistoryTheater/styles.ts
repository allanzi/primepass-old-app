import styled, { css } from 'styled-components/native';
import { TouchableOpacity as Touch } from 'react-native-gesture-handler';
import { Dimensions, TouchableOpacityProps } from 'react-native';

const { width } = Dimensions.get('window');
const BTNWIDTH = width * 0.85;

interface TicketCodeProps {
  lastItem?: boolean;
  copy: boolean;
}

interface ButtonProps extends TouchableOpacityProps {
  outline?: boolean;
}

export const Container = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Title = styled.View`
  height: 70px;
  align-items: center;
  justify-content: center;
`;
export const TitleText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 14px;
`;

export const Message = styled.View`
  align-items: center;
  width: 100%;
  margin: 30px 0 40px 0;
`;

export const MessageTitle = styled.View`
  width: 85%;
`;

export const MessageTitleText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 20px;
`;

export const NextSteps = styled.View`
  margin-top: 30px;
  width: 85%;
`;
export const NextStepsText = styled.Text`
  margin-bottom: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Button = styled(Touch)<ButtonProps>`
  width: ${BTNWIDTH}px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  /* elevation: 10; */
  margin-bottom: 10px;
  ${({ outline, theme }) => (!outline
    ? css`
          background: ${theme.colors.primaryBlue};
        `
    : css`
          background: ${theme.colors.background};
          border-width: 2px;
          border-color: ${theme.colors.primaryBlue};
        `)}
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.colorTextButton};
  font-size: 15px;
`;

export const ContainerLoader = styled.View`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ActionsContainer = styled.View`
  align-items: center;
`;

/// ////////// paid;

export const Scroll = styled.ScrollView``;

export const Content = styled.View`
  flex: 1;
  background: transparent;
  padding: 31px 16px 94px 16px;
`;

export const Section = styled.View``;

export const Label = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const TotalTicketsLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
`;

export const TicketsCodeContainer = styled.View`
  width: 100%;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.colorTextButtonDisable};
  margin-top: 7px;
`;

export const TicketCode = styled.View<TicketCodeProps>`
  ${({ lastItem }) => !lastItem
    && css`
      border-bottom-width: 1px;
      border-style: solid;
      border-color: ${({ theme }) => theme.colors.colorLabel};
    `}

  ${({ copy }) => (copy
    ? css`
          flex-direction: row;
          justify-content: space-around;
        `
    : css`
          justify-content: center;
        `)}

  align-items: center;
  height: 60px;
`;

export const TicketCodeText = styled.Text<TicketCodeProps>`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  font-size: 22px;
  ${({ copy }) => !copy
    && css`
      letter-spacing: 6px;
    `}
`;

export const CopyContainer = styled.TouchableOpacity``;

export const IconCopy = styled.Image`
  width: 16px;
  height: 16px;
`;

// export const Title = styled.Text``;

export const PartnerContainer = styled.View`
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  max-height: 100px;
`;

export const LogoPartner = styled.Image`
  width: 100%;
  height: 100%;
  max-width: 158px;
  max-height: 64px;
`;

export const Text = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
`;

export const ContainerButton = styled.View`
  padding: 22px 28px;
`;

// export const ContainerLoader = styled.View`
//   background: ${({ theme }) => theme.colors.background};
//   flex: 1;
//   align-items: center;
//   justify-content: center;
// `;
// export const ActionsContainer = styled.View`
//   align-items: center;
// `;
