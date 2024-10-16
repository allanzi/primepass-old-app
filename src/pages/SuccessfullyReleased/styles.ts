import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

const { width } = Dimensions.get('window');

interface TicketCodeProps {
  lastItem?: boolean;
  copy: boolean;
}

export const Container = styled.SafeAreaView`
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
`;

export const ContainerSteps = styled.View`
  padding: 22px 28px;
`;

export const Scroll = styled.ScrollView``;

export const TicketSection = styled.View`
  height: 220px;
  width: ${width}px;
  background: #949494;
  align-items: center;
  justify-content: center;
`;

export const ExampleTitle = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
`;

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

export const ContainerLoader = styled.View`
  background: ${({ theme }) => theme.colors.background};
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const CopyContainer = styled.TouchableOpacity``;

export const IconCopy = styled.Image`
  width: 16px;
  height: 16px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.white};
`;

export const PartnerContainer = styled.View`
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  max-height: 100px;
`;

export const LogoPartner = styled(FastImage)`
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
