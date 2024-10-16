import styled, { css } from 'styled-components/native';
import { TextProps, Dimensions } from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

interface DescriptionProps extends TextProps {
  warn?: boolean;
}

export const Container = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  justify-content: space-between;
`;

export const Section = styled.View`
`;

export const CardContainer = styled.Image`
  width: ${(WIDTH * 296) / 360}px;
  height: ${(HEIGHT * 180) / 640}px;
  align-self: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 20px;
  text-align: left;
  width: 100%;
  font-weight: 700;
  padding: 32px 32px 0px 32px;
`;

export const DescriptionContainer = styled.View`
  flex-direction: row;
  max-width: 350px;
  padding: 32px 32px 0 32px;
`;

export const Description = styled.Text<DescriptionProps>`
  color: ${({ theme, warn }) => (!warn ? theme.colors.colorText : theme.colors.colorError)};
  font-size: 14px;
  text-align: justify;
  line-height: 24px;

  ${({ warn }) => warn && css`
    font-weight: 700;
  `}
`;

export const Footer = styled.View`
  margin-bottom: 50px;
  height: 160px;
  padding: 32px 32px 0 32px;
  justify-content: space-around;
`;
